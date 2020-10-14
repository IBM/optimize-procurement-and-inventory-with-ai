const data = {
  "space_id": "6b00e95c-e9c2-438a-a01e-01dee680ef87",
  "name": "horea-resource12-oct9",
  "deployment": {
      "id": "c88bf7b8-5f00-4a9a-be10-67b9e6f24781"
  },
  "decision_optimization": {
    "input_data": [
      {
        "id":"customerDemand.csv",
        "fields" : ["Product","Demand"],
        "values" : [
          ["handSanitizer", 100],
          ["mask", 120]
        ]
      },
      {
        "id":"plants.csv",
        "fields" : ["Plants","Cost","Capacity","Product"],
        "values" : [
          [1,3,40,"mask"],
          [2,2,30,"mask"],
          [3,1,30,"handSanitizer"],
          [4,3,100,"handSanitizer"],
          [5,2,60,"mask"],
          [6,1,45,"mask"]
        ]
      }
    ],
    "output_data": [
      {
        "id":".*\\.csv"
      }
  ]
}
};

function sendData( data ) {
  console.log( 'Sending data' );
  // console.log(data)

  const XHR = new XMLHttpRequest();

  XHR.addEventListener( 'load', function(event) {
    alert( 'Yeah! Data sent and response loaded.' );
  } );

  // Define what happens in case of error
  XHR.addEventListener( 'error', function(event) {
    alert( 'Oops! Something went wrong.' );
  } );

  // Set up our request
  XHR.open( 'POST', 'http://localhost:8080/send' );

  // Add the required HTTP header for form data POST requests
  XHR.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );

  // Finally, send our data.
  console.log('sdf')
  console.log(data)
  XHR.send( JSON.stringify(data) );
}

const btn = document.querySelector('button');

btn.addEventListener( 'click', function() {
  console.log('btneventListenr')
  sendData( data );
});