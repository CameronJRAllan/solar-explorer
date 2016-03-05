// Libraries
var express = require('express');
var exec = require('child_process').exec;

// Create the server instance
var app = express();

// Serve the web content
app.use(express.static('public_html'));

// Return the planet data from the python script on /api/planet_data
app.get('/api/planet_data', function(req, res) {
   exec("python script/script.py", function(error, stdout, stderr){
     res.send(stdout)
   });
});

// Start the server
var server = app.listen(80, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
});
