'use strict';

const express = require('express')
const app = express();
const axios = require('axios');
var bodyParser = require("body-parser");
const fileupload = require('express-fileupload');
const defaultData = require('./data.js')
require('dotenv').config();
var cors = require('cors')
app.use(cors());

//tells the application to use body-parser as middleware so it can handle post requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileupload());
app.use(express.static('public'));

//create tag to query for our solution in Watson Machine Learning easier
let randomTag = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
let tagAr = [randomTag];

const postURL = 'https://us-south.ml.cloud.ibm.com/ml/v4/deployment_jobs?version=2020-09-01';

const getURL = 'https://us-south.ml.cloud.ibm.com/ml/v4/deployment_jobs?space_id=' + process.env.SPACE_ID +
  '&tag.value=' + randomTag + '&state=completed&deployment_id=' + process.env.DEPLOYMENT_ID + '&version=2020-09-01';

//create a Watson Machine Learning job to solve a decision optimization problem using input files
app.post('/send', async function (req, res) {

  //parse the inputted files from the UI
  let json = req.files[0].data.toString();
  let plantFile = req.files[1].data.toString();

  //take away special characters to make files easier to parse
  json = json.replace(/(?:\r|\r|)/g, '');
  plantFile = plantFile.replace(/(?:\r|\r|)/g, '');

  //split files on new line
  var lines = json.split("\n");
  var lines2 = plantFile.split("\n");

  var result = [], result2 = [];

  //set the first split as the headers
  var headersDemand = lines[0].split(",");
  var headersPlants = lines2[0].split(",");

  //split csv file by comma, then push into array. 
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
  };

  //set plants object
  let customerDemandsObj = {
    id: req.files[0].name,
    fields: headersDemand,
    values: result
  };

  //add tag before we create a new job to solve a Decision optimization problem
  defaultData.requestBody.tags = tagAr;

  //push the parsed data from the input files as part of our request body
  defaultData.requestBody.decision_optimization.input_data.push(customerDemandsObj, plantsObj);

  let response = await axios.post(postURL, defaultData.requestBody,
    {
      headers: {
        'Authorization': process.env.TOKEN,
        'Content-Type': 'application/json',
      }
    });
  await res.send(JSON.stringify(response.data));
});

//create a Watson Machine Learning job to solve a decision optimization problem using default data from the ./data.js file
app.post('/sendDefault', async function (req, res) {

  //add tag for default scenario
  defaultData.data.tags = tagAr;

  let response = await axios.post(postURL, defaultData.data,
    {
      headers: {
        'Authorization': process.env.TOKEN,
        'Content-Type': 'application/json'
      }
    })
  await res.send(JSON.stringify(response.data));
});

//get Watson Machine Learning solution by querying for our job, with the tag we created earlier
app.get('/decisionSolution', async function (req, res) {

  let response = await axios.get(getURL,
    {
      headers: {
        'Authorization': process.env.TOKEN,
        'Content-Type': 'application/json'
      }
    })
  console.log(JSON.stringify(response.data));
  await res.send(JSON.stringify(response.data));
});

app.listen(process.env.PORT, process.env.HOST);
console.log(`Running on http://${process.env.HOST}:${process.env.PORT}`);