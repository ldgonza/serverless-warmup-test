const moment = require('moment');
const AWS = require('aws-sdk');
var lambda = new AWS.Lambda({region: "us-east-1"});

async function warmup(){
  let concurrency = 200;

  let now = moment();
  let startOfDay = moment().startOf("day");
  let minutes = parseInt(moment.duration(now.diff(startOfDay)).asMinutes());
  const params = {
    FunctionName: "warmup-test-dev-test",
    // InvocationType: "Event",
    InvocationType: "RequestResponse",
    LogType: "None",
    Qualifier: process.env.SERVERLESS_ALIAS || "$LATEST",
    Payload: JSON.stringify({"source": "warmup", "number": minutes})
  };
  
  try {
    await Promise.all(Array(concurrency).fill(0).map(async () => { await lambda.invoke(params).promise();}));
    console.log('Warm Up Invoke Success - ' + minutes);
    return {status: "SUCCCESS", minute: minutes};
  } catch (e) {
    console.log('Warm Up Invoke Error - ' + minutes, e);
    return {status: "ERROR", minute: minutes};
  }
}

module.exports.warmup = warmup;
