// Libraries
var express = require('express');
var morgan  = require('morgan');
var exec = require('child_process').exec;

// Create the server instance
var app = express();

// Report connections to console
app.use(morgan('dev'));

// Serve the web content
app.use(express.static('public_html'));

// Converts a serialized location string into a object
function convertLocation(location) {
	location = location.substring(1, location.length-2);
	var elements = location.replace(/\s+/g, " ").split(" ");
	var x = parseFloat(elements[0]);
	var y = parseFloat(elements[1]);
	var z = parseFloat(elements[2]);
	return {"x":x, "y": y, "z": z}
}

// Return the planet data from the python script on /api/planet_data
app.get('/api/planet_data', function(req, res) {
	res.set({ 'Content-Type': 'application/json' });
	res.end(getPlanetJSON("", "", "", ""));
});

// Allow the user to specify their own date for the planet data
app.get('/api/planet_data/:year/:month/:day/:hour'), function(req, res) {
	res.set({ 'Content-Type': 'application/json' });
	res.end(getPlanetJSON(req.params.year, req.params.month, req.params.day, req.params.hour));
}

function getPlanetJSON(Year, Month, Day, Hour) {
	var apiCall = "python script/skyfield_example.py " + Year + " " + Month + " " + Day + " " + Hour; 
	var objects = [];
 	exec(apiCall, function(error, stdout, stderr) {
		// Split into lines
		var items = stdout.replace(/(\r\n|\n|\r)/gm,"").split(",");
		// Parse the lines into objects
		for (var i = 0; i < items.length; i++) {
			if (i % 4 == 0 && i >= 1) {
				var name = items[i-4];
				var location = convertLocation(String(items[i-3]));
				var diameter = parseInt(items[i-2]);
				var colourBase = items[i-1].substring(0,6);
				var colourShade = items[i-1].substring(8,14);
				var object = {"name": name, "location": location, "diameter": diameter, "colour": colourBase}
				objects.push(object);
			}
		}
	});
	return JSON.stringify(objects);
}

// Start the server
var server = app.listen(80, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
});
