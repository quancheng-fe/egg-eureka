'use strict';

const { Eureka } = require('eureka-js-client');
const ip = require('ip');
const url = require('url');
const assert = require('assert');

const parseRegistryServer = server => {
  assert(server, "can't work without eureka server config");
  if (server.indexOf(',') > -1) {
    server = server.split(',');
  }
  if (Array.isArray(server)) {
    return {
      serviceUrls: {
        default: server,
      },
    };
  }
  const { host, port, path } = url.parse(server);
  return {
    host,
    port,
    servicePath: path,
  };
};

module.exports = app => {
  let eggReady = false;

  const eurekaConfig = app.config.eureka || {};
  const { instance = {}, registry = {} } = eurekaConfig;

  const ipAddr = ip.address();
  const port = app.options.port || app.config.cluster.listen.port;
  const version = app.config.pkg.version;

  const hostName = instance.hostName || ipAddr;

  const formatUrl = (path = '/') =>
    url.format({
      host: hostName,
      port,
      path,
    });

  const instanceInfo = {
    app: `${app.name}:${version}`,
    instanceId: `${ipAddr}:${app.name}:${version}`,
    hostName,
    ipAddr,
    port: {
      $: port,
      '@enabled': 'true',
    },
    homePageUrl: formatUrl(instance.homePageUrl || '/'),
    statusPageUrl: formatUrl(instance.statusPageUrl || 'info'),
    healthCheckUrl: formatUrl(instance.healthCheckUrl || 'health'),
    secureVipAddress: instance.secureVipAddress || ipAddr,
    vipAddress: instance.vipAddress || ipAddr,
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  };

  const registryInfo = Object.assign(registry, parseRegistryServer(registry.server));

  const client = new Eureka({
    logger: app.logger,
    instance: instanceInfo,
    eureka: registryInfo,
  });

  Object.assign(app, 'eurekaClient', {
    get() {
      return client;
    },
  });

  if (registry.registerWithEureka === false) {
    app.logger.info('[egg-eureka]: app will not register with Eureka');
  }

  client.start(() => {
    app.logger.info('[egg-eureka]: client started');
  });

  client.on('registryUpdated', () => {
    eggReady && app.messenger.sendToApp('registryUpdated', client.cache.app);
  });

  app.messenger.once('egg-ready', () => {
    eggReady = true;
  });

  app.on('close', () => client.stop());

  return client;
};
