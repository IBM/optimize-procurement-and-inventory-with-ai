'use strict';

const express = require('express')
const app = express();
const axios = require('axios');
var bodyParser = require("body-parser");


const host = '0.0.0.0';
require('dotenv').config();

app.use(express.static('public'))

//tells the application to use body-parser as middleware so it can handle post requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

console.log(process.env.PORT)

const url = 'https://us-south.ml.cloud.ibm.com/ml/v4/deployment_jobs?space_id=6b00e95c-e9c2-438a-a01e-01dee680ef87&deployment_id=c88bf7b8-5f00-4a9a-be10-67b9e6f24781&version=2020-09-01&version=2020-09-01'
const postURL = 'https://us-south.ml.cloud.ibm.com/ml/v4/deployment_jobs?version=2020-09-01'


app.post('/send', function (req, res) {
  console.log('app post send')
  console.log(JSON.stringify(req.body, null, 1000))
  res.send('POST request to the homepage')
})

app.get('/', (req, res) => {
  console.log('sdfdsf')
  axios.post(url,data,{
    headers: {
      'Authorization': process.env.TOKEN,
      'Content-Type': 'application/json'
    }
  })
  .then((response) => {
    console.log(JSON.stringify(response.data, null, 1000))
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  })
  .then(() => {
    res.send('Hello world')
  })

})

app.listen(process.env.PORT, host);
console.log(`Running on http://${host}:${process.env.PORT}`);
