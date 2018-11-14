# egg-eureka

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-eureka.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-eureka
[travis-image]: https://img.shields.io/travis/eggjs/egg-eureka.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-eureka
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-eureka.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-eureka?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-eureka.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-eureka
[snyk-image]: https://snyk.io/test/npm/egg-eureka/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-eureka
[download-image]: https://img.shields.io/npm/dm/egg-eureka.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-eureka

Polling fetch Eureka registry and get instance info

This plugin runs on agent worker

and will send registry data to app worker when updated

then you could use `ctx.app.getInstancesByAppId(appId)` to get instances by certain appId

## Install

```bash
$ npm i egg-eureka --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.eureka = {
  enable: true,
  package: 'egg-eureka'
}
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.eureka = {
  instance: {
    hostName: 'egg-eureka-app.local',
    // secureVipAddress: '',  
    // vipAddress: '',
    homePageUrl: '/', // just path, will automatically join with ip and port or hostname if given
    statusPageUrl: '/info', // just path, will automatically join with ip and port or hostname if given
    healthCheckUrl: '/health' // just path, will automatically join with ip and port or hostname if given
  },
  registry: {
    server: 'http://localhost:32768/eureka/v2/apps/', // if use eureka cluster, then pass an (Array<url>, or String split by ',') eg: ['eureka1host/path','eureka2/path] or 'eureka1host/path, eureka2host/path'
    heartbeatInterval: 5000,
    registryFetchInterval: 1000,
    //... other config follow eureka-js-client https://github.com/jquatier/eureka-js-client#advanced-configuration-options
  }
}
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example



## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
