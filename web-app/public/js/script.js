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
output.innerHTML += '<br>'
// output.innerHTML += '<p id = "inputDataText" >Input data from files: </p>' + JSON.stringify(inputData, undefined, 4);
output.innerHTML += '<b><p id = "fileName1" > Filename: </p></b>'  + '<span>' + firstFile.id + '</span><br>' 

output.innerHTML += '<p id = "inputDataText" >Input data from ' + firstFile.id+ ': </p><br>'

for (let i = 0; i < firstFile.values.length; i++) {
  for (j = 0; j < firstFile.fields.length; j++) {
    output.innerHTML += '<span>' + '<b>' + firstFile.fields[j] + ': </b>' + firstFile.values[i][j] + '</span>' 
    output.innerHTML += '<br>'
  }
  output.innerHTML += '<br>'
}


output.innerHTML += '<b><p id = "fileName2" > Filename: </p></b>'  + '<span>' + secondFile.id + '</span><br>' 

output.innerHTML += '<p id = "inputDataText" >Input data from ' + secondFile.id + ': </p><br>'

for (let i = 0; i < secondFile.values.length; i++) {
  for (j = 0; j < secondFile.fields.length; j++) {
    output.innerHTML += '<span>' + '<b>' + secondFile.fields[j] + ': </b>' + secondFile.values[i][j] + '</span>' 
    output.innerHTML += '<br>'
  }
  output.innerHTML += '<br>'
}
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
