'use strict';

const express = require('express')
const app = express();
const axios = require('axios');
var bodyParser = require("body-parser");
const fileupload = require('express-fileupload')
const util = require('util')

const data = {
  "space_id": "6b00e95c-e9c2-438a-a01e-01dee680ef87",
  "name": "horea-resource12-oct9",
  "deployment": {
    "id": "c88bf7b8-5f00-4a9a-be10-67b9e6f24781"
  },
  "decision_optimization": {
    "input_data": [
      {
        "id": "customerDemand.csv",
        "fields": ["Product", "Demand"],
        "values": [
          ["handSanitizer", 100],
          ["mask", 120]
        ]
      },
      {
        "id": "plants.csv",
        "fields": ["Plants", "Cost", "Capacity", "Product"],
        "values": [
          [1, 3, 40, "mask"],
          [2, 2, 30, "mask"],
          [3, 1, 30, "handSanitizer"],
          [4, 3, 100, "handSanitizer"],
          [5, 2, 60, "mask"],
          [6, 1, 45, "mask"]
        ]
      }
    ],
    "output_data": [
      {
        "id": ".*\\.csv"
      }
    ]
  }
};


require('dotenv').config();

app.use(express.static('public'))
// 
//tells the application to use body-parser as middleware so it can handle post requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileupload());

console.log(process.env.PORT)

const url = 'https://us-south.ml.cloud.ibm.com/ml/v4/deployment_jobs?space_id=6b00e95c-e9c2-438a-a01e-01dee680ef87&deployment_id=c88bf7b8-5f00-4a9a-be10-67b9e6f24781&version=2020-09-01&version=2020-09-01'
const postURL = 'https://us-south.ml.cloud.ibm.com/ml/v4/deployment_jobs?version=2020-09-01'

app.post('/send', async function (req, res) {

  let reqBody = {};
  reqBody.space_id = process.env.SPACE_ID
  reqBody.name = process.env.NAME
  reqBody.deployment = {};
  reqBody.deployment.id = process.env.DEPLOYMENT_ID
  reqBody.decision_optimization = {};
  reqBody.decision_optimization.input_data = [];
  reqBody.decision_optimization.output_data = [];
  reqBody.decision_optimization.output_data[0] = {
    "id": ".*\\.csv"
  };

  console.log(req.fields)
  console.log(req.files)

  console.log('data from the top of the file: ')
  console.log(util.inspect(data, { showHidden: false, depth: 100 }))

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


  reqBody.decision_optimization.input_data.push(customerDemandsObj, plantsObj)
  console.log('inputdata')
  console.log(reqBody.decision_optimization.input_data)
  console.log('after we for loop thru the files reqBody: ')
  console.log(util.inspect(reqBody, { showHidden: false, depth: 100 }))
  console.log('reqBody.decision_optimization.input_data')

  console.log(reqBody.decision_optimization.input_data)
  console.log(reqBody)

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
  await res.send('hello-word')
})


app.listen(process.env.PORT, process.env.HOST);
console.log(`Running on http://${process.env.HOST}:${process.env.PORT}`);

  // json = json.replace(/(?:\r\n|\r|\n)/g, ',');
  // console.log(json)

  // let words = json.split('\n,| \r')
// console.log(words)