const warmup = require('../lib/warmup.js');
const moment = require('moment');
const AWS = require('aws-sdk');
var lambda = new AWS.Lambda();

export const handler = async (event, context, callback) => {
  return await warmup.warmup();
}
