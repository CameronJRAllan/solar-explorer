
// Calls the web service and invokes the callback when the response in recieved
// The callback looks like this: function(data) where data is an array of objects
function getPlanetData(year, month, day, hour, callback) {
  // The request url
  var requestUrl = "api/planet_data/" + year.toString() + "/" + month.toString() + "/" + day.toString() + "/" + hour.toString();

  // Make the AJAX call
  $.ajax({ url: requestUrl, content: "application/json"}).done(
    function(response) {
      createPlanets(response);
    });
}

// Gets the current planet data and returns the response in a callback
// The callback looks like this: function(data) where data is an array of objects
function getPlanetDataNow(callback) {
  // Get the current date for the parameters
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var day = now.getDay();
  var hour = now.getHours();

  // Get the planet data
  getPlanetData(year, month, day, hour, callback);
}



// Invoked when the window loads and the app can be started
$(window).load(function() {
  // Call the web service to get the planet data and pass the response onto GL to create the planets
  getPlanetDataNow(function(data) {
    createPlanets(data);
  });
});


var planetArr = [];  //This needs ot be global?!


function createPlanets(planets) {
   console.log("Entering createPlanets");	//DEBUG

  //Create planet array to render.
   console.log(planets.length);

   // Iterate through all of the
   for (index in planets) {
    // Get the current planet
    var jPlanet = planets[index];
    console.log(jPlanet.name);
    //console.log(jPlanet);

    //console.log(jPlanet);


    //Add this planet to the array.
    this.planetArr[index] = new planet(jPlanet.name, jPlanet.vector, jPlanet.diameter, jPlanet.colour)

      scene.add(this.planetArr[index].mesh);
    }
}

// Setup three.js WebGL renderer. Note: Antialiasing is a big performance hit.
// Only enable it if you actually need to.
var renderer = new THREE.WebGLRenderer({antialias: false});
renderer.setPixelRatio(window.devicePixelRatio);

// Append the canvas element created by the renderer to document body element.
document.body.appendChild(renderer.domElement);

// Create a three.js scene.
var scene = new THREE.Scene();
scene.add( new THREE.AmbientLight( 0x444444 ) );

// Create a three.js camera.
var camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.y = 200;
camera.position.x = 200;
camera.rotationY = 3.1412/2;



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

// Reset the position sensor when 'z' pressed.
function onKey(event) {
  if (event.keyCode == 90) { // z
    controls.resetSensor();
  }
}
window.addEventListener('keydown', onKey, true);

// Forward the position by 10 days when '<' pressed.
function onKey(event) {
  if (event.keyCode == 60) { // z

  }
}
window.addEventListener('keydown', onKey, true);

// Go back 10 days when '>' pressed.
function onKey(event) {
  if (event.keyCode == 62) { // z

  }
}
window.addEventListener('keydown', onKey, true);
