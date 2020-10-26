const form = document.querySelector('form')
const solutionUpdate = document.getElementById('solutionUpdate')
const output = document.getElementById('output')
const outputText = document.getElementById('doOutputText')
const doSolText = document.getElementById('doSolText')
const solution = document.getElementById('solution')
doOutputText.hidden = true;
doSolText.hidden = true;
solutionUpdate.hidden = true;

form.addEventListener('submit', async (e) => {
  output.innerHTML = 'Working...'
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
  console.log(body)
  output.innerHTML = body;
  solutionUpdate.hidden = false;

})

solutionUpdate.addEventListener('click', async (e) => {
  doSolText.hidden = false;
  solution.hidden = false;
  solution.innerHTML = 'Working...';
  var resp = await fetch('http://localhost:8080/decisionSolution')
  var solBody = await resp.text()
  solution.innerHTML = solBody;
  console.log(solBody)

})
