'use strict';

const express = require('express')
const app = express();
const axios = require('axios');
var bodyParser = require("body-parser");
const fileupload = require('express-fileupload')
const util = require('util')

require('dotenv').config();

app.use(express.static('public'))
// 
//tells the application to use body-parser as middleware so it can handle post requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileupload());

console.log(process.env.PORT)

const postURL = 'https://us-south.ml.cloud.ibm.com/ml/v4/deployment_jobs?version=2020-09-01'

let randomTag = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

const getURL = 'https://us-south.ml.cloud.ibm.com/ml/v4/deployment_jobs?space_id=' + process.env.SPACE_ID + 
'&tag.value=' + randomTag + '&state=completed&deployment_id=' + process.env.DEPLOYMENT_ID + '&version=2020-09-01'

// const getURLIntermediate = 'https://us-south.ml.cloud.ibm.com/ml/v4/deployment_jobs?space_id=' + process.env.SPACE_ID + 
// '&tag.value=' + randomTag + '&state=completed&deployment_id=' + process.env.DEPLOYMENT_ID_INTERMEDIATE + '&version=2020-09-01'

console.log(randomTag)
let tagAr = [randomTag];

app.post('/send', async function (req, res) {

  let reqBody = {};
  reqBody.space_id = process.env.SPACE_ID
  reqBody.name = process.env.NAME
  reqBody.tags = tagAr
  reqBody.deployment = {};
  reqBody.deployment.id = process.env.DEPLOYMENT_ID
  // reqBody.deployment.id = process.env.DEPLOYMENT_ID_INTERMEDIATE
  reqBody.decision_optimization = {};
  reqBody.decision_optimization.input_data = [];
  reqBody.decision_optimization.output_data = [];
  reqBody.decision_optimization.output_data[0] = {
    "id": ".*\\.csv"
  };

  console.log(req.fields)
  console.log(req.files)

  console.log('app post send')
  console.log('req.files')
  console.log(req.files)

  let json = req.files[0].data.toString();
  let plantFile = req.files[1].data.toString();
  console.log(json)

  json = json.replace(/(?:\r|\r|)/g, '');
  plantFile = plantFile.replace(/(?:\r|\r|)/g, '');

  console.log(json)
  var lines = json.split("\n");
  var lines2 = plantFile.split("\n");

  console.log(lines)

  var result = [];
  var result2 = [];

  var headersDemand = lines[0].split(",");
  var headersPlants = lines2[0].split(",");

  //split csv file by comma, then stringify the results and push into array. 
  for (var i = 1; i < lines.length - 1; i++) {
    var currentline = lines[i].split(",");
    result.push(currentline);
  }
  for (var i = 1; i < lines2.length - 1; i++) {
    var currentline = lines2[i].split(",");
    result2.push(currentline);
  }

  //set customerDemand object
  let plantsObj = {
    id: req.files[1].name,
    fields: headersPlants,
    values: result2
  }

  //set plants object
  let customerDemandsObj = {
    id: req.files[0].name,
    fields: headersDemand,
    values: result
  }

  console.log('customerDemandsObj')
  console.log(customerDemandsObj)

  console.log('plantsObj')
  console.log(plantsObj)


  reqBody.decision_optimization.input_data.push(customerDemandsObj, plantsObj)

  let response = await axios.post(postURL, reqBody, 
    {
      headers: {
        'Authorization': process.env.TOKEN,
        'Content-Type': 'application/json'
    }
  })
  await res.send(JSON.stringify(response.data))
})

app.get('/decisionSolution', async function (req, res) {

  let response = await axios.get(getURL,
    {
      headers: {
        'Authorization': process.env.TOKEN,
        'Content-Type': 'application/json'
    }
  })
  console.log(JSON.stringify(response.data));
  await res.send(JSON.stringify(response.data))
})


app.listen(process.env.PORT, process.env.HOST);
console.log(`Running on http://${process.env.HOST}:${process.env.PORT}`);