'use strict';

/**
 * egg-eureka default config
 * @member Config#eureka
 * @property {String} SOME_KEY - some description
 */
exports.eureka = {
  instance: {
    hostName: 'egg-eureka-app.local',
    // secureVipAddress: '',
    // vipAddress: '',
    homePageUrl: '/',
    statusPageUrl: '/info',
    healthCheckUrl: '/health',
  },
  registry: {
    server: 'http://localhost:32768/eureka/v2/apps/', // if use eureka cluster, then pass an (Array<url>, or String split by ',') eg: ['eureka1host/path','eureka2/path] or 'eureka1host/path, eureka2host/path'
    heartbeatInterval: 5000,
    registryFetchInterval: 1000,
  },
};
