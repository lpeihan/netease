"use strict";
const pkg = require("../package.json");
const config = require("./index");

module.exports = {
  NODE_ENV: '"production"',
  apiUrl: '"http://47.98.144.117:3000"',
  version: JSON.stringify(pkg.version),
  ENV: '"pro"'
};
