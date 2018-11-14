'use strict';

module.exports = app => {
  let cachedApp = {};

  app.messenger.on('registryUpdated', apps => {
    cachedApp = apps;
  });

  Object.assign(app, 'getInstancesByAppId', {
    get(appId) {
      // copy from eureka-js-client

      if (!appId) {
        throw new RangeError('Unable to query instances with no appId');
      }
      const instances = cachedApp[appId.toUpperCase()] || [];

      if (instances.length === 0) {
        app.logger.warn('[egg-eureka] Unable to retrieve instances for appId: ' + appId);
      }

      return instances;
    },
  });
};
