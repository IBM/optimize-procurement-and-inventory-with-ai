const form = document.querySelector('form')
const solutionUpdate = document.getElementById('solutionUpdate')
const output = document.getElementById('output')
const outputText = document.getElementById('doOutputText')
const doSolText = document.getElementById('doSolText')
const solution = document.getElementById('solution')
const firstSpinner = document.getElementById('firstSpinner')
const secondSpinner = document.getElementById('secondSpinner')

doOutputText.hidden = true;
doSolText.hidden = true;
solutionUpdate.hidden = true;
firstSpinner.hidden = true;
secondSpinner.hidden = true;

form.addEventListener('submit', async (e) => {
  firstSpinner.hidden = false;
  outputText.hidden = false;
  e.preventDefault()

  const files = document.querySelector('[type=file]').files;
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    let file = files[i]

    formData.append(i, file)
  }

  var res = await fetch('http://localhost:8080/send', {
    method: 'POST',
    body: formData,
  })
  var body = await res.text()
  let jsonBody = JSON.parse(body)
  console.log('jsonBody')
  console.log(jsonBody)
  let firstFile = jsonBody.entity.decision_optimization.input_data[0];
  let secondFile = jsonBody.entity.decision_optimization.input_data[1];
  console.log('firstFile')
  console.log(firstFile)
  console.log('secondFile')
  console.log(secondFile)

let createdAt = jsonBody.metadata.created_at


firstSpinner.hidden = true;
output.innerHTML += '<p id = "jobText" >Job created at: </p>' + '<span>' + createdAt + '</span>';
// output.innerHTML += '<br>'
// // output.innerHTML += '<p id = "inputDataText" >Input data from files: </p>' + JSON.stringify(inputData, undefined, 4);
// output.innerHTML += '<b><p id = "fileName1" > Filename: </p></b>'  + '<span>' + firstFile.id + '</span><br>' 

// output.innerHTML += '<p id = "inputDataText" >Input data from ' + firstFile.id+ ': </p><br>'

// for (let i = 0; i < firstFile.values.length; i++) {
//   for (j = 0; j < firstFile.fields.length; j++) {
//     output.innerHTML += '<span>' + '<b>' + firstFile.fields[j] + ': </b>' + firstFile.values[i][j] + '</span>' 
//     output.innerHTML += '<br>'
//   }
//   output.innerHTML += '<br>'
// }


// output.innerHTML += '<b><p id = "fileName2" > Filename: </p></b>'  + '<span>' + secondFile.id + '</span><br>' 

// output.innerHTML += '<p id = "inputDataText" >Input data from ' + secondFile.id + ': </p><br>'

// for (let i = 0; i < secondFile.values.length; i++) {
//   for (j = 0; j < secondFile.fields.length; j++) {
//     output.innerHTML += '<span>' + '<b>' + secondFile.fields[j] + ': </b>' + secondFile.values[i][j] + '</span>' 
//     output.innerHTML += '<br>'
//   }
//   output.innerHTML += '<br>'
// }
solutionUpdate.hidden = false;

})

solutionUpdate.addEventListener('click', async (e) => {
  secondSpinner.hidden = false;
  doSolText.hidden = false;
  solution.hidden = false;
  var resp = await fetch('http://localhost:8080/decisionSolution')
  var solBody = await resp.text()
  var body = JSON.parse(solBody)
  console.log(body.resources)
  // let outputData = body.resources[0].entity.decision_optimization.output_data[2];
  let fields = body.resources[0].entity.decision_optimization.output_data[2].fields
  let values = body.resources[0].entity.decision_optimization.output_data[2].values

  let barChartAr = [];
  let barChartAxis = [];
  let barChartColor = [];

  console.log(fields)
  secondSpinner.hidden = true;
  for (let i = 0; i < values.length; i++) {
    for (j = 0; j < fields.length; j++) {
      console.log('fields j')
      console.log(fields[j])
      if (fields[j] == 'plants allocation decision') {
        barChartAr.push(values[i][j])
      }
      if (fields[j] == 'plants') {
        barChartAxis.push('Plant ' + values[i][j])
      }
      if (fields[j] == 'plants Product'){
        if (values[i][j] == 'mask') {
          barChartColor.push('rgba(255, 99, 132, 0.2)')
          
        } else {
          barChartColor.push('rgba(54, 162, 235, 0.2')
        }
      } 
      // solution.innerHTML += '<span>' + '<b>' + fields[j] + ': </b>' + values[i][j] + '</span>'
      // solution.innerHTML += '<br>'
    }
    // solution.innerHTML += '<br>'
  }
  console.log('barChartColor')
  console.log(barChartColor)

  var ctx2 = document.getElementById('myChartSolution').getContext('2d');
  console.log('hello')
  var myChart = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: barChartAxis,
        datasets: [{
            label: 'Plants Solution - Order the following amount from each plant',
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
          display: true,
          labels: {
              fontColor: 'rgb(255, 99, 132)'
          },
          title: {
            text: "blue is hand sanitizer, red is masks"
          }
        },
        responsive: false
    }
});

  console.log('bar chart ar')
  console.log(barChartAr)
  console.log('bar chart axis')
  console.log(barChartAxis)
  console.log(solBody)
})

var ctx = document.getElementById('myChart').getContext('2d');
console.log('hello')
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Masks', 'Hand Sanitizer'],
        datasets: [{
            label: 'Predicted Demand for Masks and Hand Sanitizer for Jan 2021',
            data: [120, 100],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
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
        responsive: false
    }
});
