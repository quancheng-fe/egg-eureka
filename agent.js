'use strict';

const loadEureka = require('./lib/eureka');

module.exports = agent => {
  loadEureka(agent);
};
