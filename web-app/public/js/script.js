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
  let inputData = jsonBody.entity.decision_optimization.input_data
  console.log('inputData')
  console.log(inputData)
  let createdAt = jsonBody.metadata.created_at
  console.log('createdAt')
  console.log(createdAt)
  // let jsonBody = JSON.parse(body)
  // let parsedJSON = await res.json();
  // console.log(body)
  console.log(jsonBody.metadata)
  
  firstSpinner.hidden = true;
  output.innerHTML += '<p id = "jobText" >Job created at: </p>' + '<span>' +  createdAt + '</span>';
  output.innerHTML += '<br>'
  output.innerHTML += '<p id = "inputDataText" >Input data from files: </p>' + JSON.stringify(inputData, undefined, 4);
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
  let outputData = body.resources[0].entity.decision_optimization.output_data[2];
  // let outputData = body.resources[0].entity.decision_optimization.output_data[2];
  let fields = body.resources[0].entity.decision_optimization.output_data[2].fields
  let values = body.resources[0].entity.decision_optimization.output_data[2].values
  // let outputStr = '';
  // for (let i = 0; i < values.length; i++) {
  //   outputStr+=fields + values[i]
  // }
  console.log(fields)
  secondSpinner.hidden = true;
  for (let i = 0; i < values.length; i++) {

    for (j = 0; j < fields.length; j++) {
      solution.innerHTML += '<span>' + '<b>' + fields[j] + ': </b>' + values[i][j] + '</span>' 
      solution.innerHTML += '<br>'
    }
    solution.innerHTML += '<br>'

  }

  console.log(solBody)

})
