// Calls the web service and invokes the callback when the response in recieved
// The callback looks like this: function(data) where data is an array of objects
function getPlanetData(when, callback) {
  // Extract the relivant variables
  var year = when.getFullYear();
  var month = when.getMonth();
  var day = when.getDay();
  var hour = when.getHours();

  // The request url
  var requestUrl = "api/planet_data/" + year.toString() + "/" + month.toString() + "/" + day.toString() + "/" + hour.toString();

  // Make the AJAX call
  $.ajax({ url: requestUrl, content: "application/json"}).done(
    function(response) {
      callback(response);
    });
}

// All of the planets in the array
var planets = [];
var planetMap = {};
var time = new Date();

// Invoked when the window loads and the app can be started
$(window).load(function() {
  // Update the planets for the first time
  updatePlanets();
});

// Returns a planet by it name
function getPlanet(name) {
  return planetMap[name];
}

// Updates all of the planets positions based on where they were at the 'time' value
function updatePlanets() {
  // Get the planet informaton from the web service
  getPlanetData(time, function(planetData) {
    for(var i = 0; i < planetData.length; i++) {
      // The current item
      var item = planetData[i];

      // If the planet already exists then update its positions
      if (getPlanet(item.name) != null) {
        // Update the position
        getPlanet(item.name).setPosition(item.vector[0], item.vector[1], item.vector[2]);
      } else {
        // Create a planet object
        var planetObj = new planet(item.name, item.vector, item.diameter, item.colour, item.planetType);

        // Store the planet for future reference
        planets[i] = planetObj
        planetMap[item.name] = planetObj;

        // Add the planet to the scene
        scene.add(this.planets[i].mesh);
      }
    }
  });
}

// Function that gets called whenever a key is pressed down
function onKey(event) {
  // key ','
  if (event.keyCode == 188) {
    // Lower the date by 10 days
    time.setDate(time.getDate() - 1);
    updatePlanets();
  } else if (event.keyCode == 190){
    // Lower the date by 10 days
    time.setDate(time.getDate() + 1);
    updatePlanets();
  }
}
window.addEventListener('keydown', onKey, true);


// Setup three.js WebGL renderer. Note: Antialiasing is a big performance hit.
// Only enable it if you actually need to.
var renderer = new THREE.WebGLRenderer({antialias: false});
renderer.setPixelRatio(window.devicePixelRatio);

// Append the canvas element created by the renderer to document body element.
document.body.appendChild(renderer.domElement);

// Create a three.js scene.
var scene = new THREE.Scene();
scene.add( new THREE.AmbientLight(0x444444));

// Create the camera.
var camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.rotation.y = 0;//3.1412/2;
camera.position.x = 0;//200;
camera.position.y = 0;//200;
camera.position.z = 0;

// Apply VR headset positional data to camera.
var controls = new THREE.VRControls(camera);

// Apply VR stereo rendering to renderer.
var effect = new THREE.VREffect(renderer);
effect.setSize(window.innerWidth, window.innerHeight);

// Create a VR manager helper to enter and exit VR mode.
var params = {
  hideButton: false, // Default: false.

  isUndistorted: false // Default: false.
};
var manager = new WebVRManager(renderer, effect, params);

// Request animation frame loop function
var lastRender = 0;
function animate(timestamp) {
  var delta = Math.min(timestamp - lastRender, 500);
  lastRender = timestamp;

  // Update VR headset position and apply to camera.
  controls.update();

  // Render the scene through the manager.
  manager.render(scene, camera, timestamp);

  requestAnimationFrame(animate);
}

// Kick off animation loop
animate(performance ? performance.now() : Date.now());
