'use strict'

var _localConfig = require('./config.json');
var config = _localConfig;

if (process.env.WEBSITE_CONFIG) {
    config = JSON.parse(process.env.WEBSITE_CONFIG)
}

module.exports = config;
