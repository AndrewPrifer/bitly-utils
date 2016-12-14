#!/usr/bin/env node

var request = require('superagent');
var c2n = require('i18n-iso-countries');
var _ = require('lodash');
var argv = require('yargs')
    .usage('Usage: $0 -t <token> -l <link>')
    .demand(['t','l'])
    .describe('t', 'Access token')
    .describe('l', 'Link')
    .argv;

var res = request
  .get('https://api-ssl.bitly.com/v3/link/countries')
  .query(`access_token=${argv.t}`)
  .query(`link=${argv.l}`)
  .then(res => {
    var countries = res.body.data.countries;
    _.each(countries, e => {
      e.country = c2n.getName(e.country, "en");
    });
    console.log(_.map(countries, e => `${e.country}: ${e.clicks}`).join('\n'));
  });