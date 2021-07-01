const form = document.querySelector('form');
const solutionUpdate = document.getElementById('solutionUpdate');
const output = document.getElementById('output');
const outputText = document.getElementById('doOutputText');
const doSolText = document.getElementById('doSolText');
const solution = document.getElementById('solution');
const firstSpinner = document.getElementById('firstSpinner');
const secondSpinner = document.getElementById('secondSpinner');
const byod = document.getElementById('byod');
const byodText = document.getElementById('byodText');
const defaultScenario = document.getElementById('defaultScenario');
const runScenarioBtn = document.getElementById('runScenario');
let defaultFlag = false;

doOutputText.hidden = true;
doSolText.hidden = true;
solutionUpdate.hidden = true;
firstSpinner.hidden = true;
secondSpinner.hidden = true;
form.hidden = true;

//create default job, uses default input data
async function createDefaultJob() {
  firstSpinner.hidden = false;
  outputText.hidden = false;

  var res = await fetch('http://localhost:8080/sendDefault', {
    method: 'POST',
    body: '',
  });
  var body = await res.text();
  let jsonBody = JSON.parse(body);

  //parse the output from Watson Machine Learning to grab the created at time
  let createdAt = jsonBody.metadata.created_at;
  firstSpinner.hidden = true;

  //set the HTML for the job creation time
  output.innerHTML += '<p id = "jobText" >Job created at: </p>' + '<span>' + createdAt + '</span>';
  solutionUpdate.hidden = false;
}

//function to create a deployment job by sending the inputted files to the Express back end 
form.addEventListener('submit', async (e) => {
  firstSpinner.hidden = false;
  outputText.hidden = false;
  e.preventDefault();

  const files = document.querySelector('[type=file]').files;
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    let file = files[i];

    formData.append(i, file);
  }

  //send form data to our Express back end to make the API call to Watson Machine Learning to create a job 
  var res = await fetch('http://localhost:8080/send', {
    method: 'POST',
    body: formData,
  });
  var body = await res.text();
  let jsonBody = JSON.parse(body);

  let createdAt = jsonBody.metadata.created_at;

  firstSpinner.hidden = true;
  output.innerHTML += '<p id = "jobText" >Job created at: </p>' + '<span>' + createdAt + '</span>';

  solutionUpdate.hidden = false;

});

async function querySolution(data) {
  console.log(data);
  secondSpinner.hidden = false;
  doSolText.hidden = false;
  solution.hidden = false;
  var resp = await fetch('http://localhost:8080/decisionSolution');
  var solBody = await resp.text();
  var body = JSON.parse(solBody);
  console.log(body.resources);
  // let outputData = body.resources[0].entity.decision_optimization.output_data[2];
  let fields = body.resources[0].entity.decision_optimization.output_data[2].fields;
  let values = body.resources[0].entity.decision_optimization.output_data[2].values;

  let barChartAr = [];
  let barChartAxis = [];
  let barChartColor = [];

  console.log(fields);
  secondSpinner.hidden = true;

  let firstTime = new Date().getTime();
  console.log(firstTime);

  for (let i = 0; i < values.length; i++) {
    for (j = 0; j < fields.length; j++) {
      if (fields[j] == 'plants allocation decision') {
        barChartAr.push(values[i][j]);
      }
      if (fields[j] == 'plants') {
        barChartAxis.push('Plant ' + values[i][j]);
      }
      if (fields[j] == 'plants Product') {
        if (values[i][j] == 'mask') {
          //push red
          barChartColor.push('rgba(255, 99, 132, 0.2)');
        } else {
          //push blue
          barChartColor.push('rgba(54, 162, 235, 0.2)');
        }
      }
    }
  }

  let secondTime = new Date().getTime();
  console.log(secondTime);

  console.log('secondTime-firstTime in milliseconds');
  console.log(secondTime - firstTime);

  var ctx2 = document.getElementById('myChartSolution').getContext('2d');
  var myChart = new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: barChartAxis,
      datasets: [{
        data: barChartAr,
        backgroundColor: barChartColor,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: 'Amount to Order'
          },
        }],
        xAxes: [{
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: 'Plant Number'
          },
        }]
      },
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "Quantity of Products to order from each plant - Red: Mask, Blue: Hand Sanitizer"
      },
      responsive: false
    }
  });
}

solutionUpdate.addEventListener('click', async (e) => {
  querySolution(e);
});

var ctx = document.getElementById('myChart').getContext('2d');
console.log('hello');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [''],
    datasets: [{
      label: 'Masks',
      data: [120],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 1
    },
    {
      label: 'Hand Sanitizer',
      data: [100],
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)',
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: 'Demand'
        },
      }],
      xAxes: [{
        ticks: {
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: 'Product'
        },
      }]
    },
    title: {
      display: true,
      text: "Predicted Product Demand"
    },
    responsive: false
  }
});

//click on the bring your own data button
byod.addEventListener('click', async (e) => {
  form.hidden = false;
  byod.hidden = true;
  byodText.hidden = true;
  defaultScenario.hidden = true;
  runScenarioBtn.hidden = true;
});

//click on the run default scenario button
runScenarioBtn.addEventListener('click', async (e) => {
  runScenarioBtn.hidden = true;
  defaultScenario.hidden = true;
  byod.hidden = true;
  byodText.hidden = true;
  defaultFlag = true;
  await createDefaultJob();
});
