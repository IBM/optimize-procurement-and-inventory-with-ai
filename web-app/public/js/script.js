const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  // ...
  const files = document.querySelector('[type=file]').files;
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    let file = files[i]
  
    formData.append(i, file)
  }
  fetch('http://localhost:8080/send', {
    method: 'POST',
    body: formData,
  }).then((response) => {
    console.log(response)
  })
})


// async function uploadFile( files ) {


//   console.log( 'uploadFile files' );
//   firstFile = files.target.files[0]
//   console.log( firstFile );

//   // console.log(data)

//   var formData = new FormData();
//   var XHR = new XMLHttpRequest();
//   // XHR.submittedData = data.target.files; // Array of objects with files included. But it neither works with an array of files nor just one file

//   for (let i = 0; i < files.length; i++) {
//     console.log(files[i].name)
//     console.log(files[i])
//     formData.append(firstFile.name, firstFile)
//     console.log(formData)
//   }


//   XHR.open( 'POST', 'http://localhost:8080/send' );

//   // Add the required HTTP header for form data POST requests
//   // XHR.setRequestHeader( 'Content-type', 'application/json');

//   console.log('about to send form data')
//   console.log(formData.values)

//   XHR.send(formData)



// }

// async function writeF(file){
//   var reader = new FileReader();

//         reader.onload = function()

//         {

//             document.getElementById('output').innerText += reader.result;

//         }

//         reader.readAsText(file, "UTF-8");

        

// }

// async function parseCSV(evt){

//   var f = evt.target.files[0]; 
//   if (f) {
//     var r = new FileReader();
//     r.onload = function(e) { 
//         var contents = e.target.result;
//         console.log(contents)
//         var firstLine = contents.split('\n')[0];
//         console.log(firstLine)
//         let splits = contents.split('\n')
//         let val = [];
//         for (var i = 1; i < splits.length-1; i++) {

//           val.push(splits[i].split('\n'))
//         }
//         console.log('val')
//         console.log(val)

//    }
//     r.readAsText(f);
//     document.write(output);
//   } else { 
//     alert("Failed to load file");
//   }

// }