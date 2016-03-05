$(window).load(function() {
  $.ajax({
    url: "api/planet_data",
    content: "application/json"
  }).done(function(response) {
    createPlanets(response);
  });
});

  var planetArr = [];  //This needs ot be global?!


function createPlanets(planets) {
   console.log("Entering createPlanets");	//DEBUG

  //Create planet array to render.
   console.log(planets.length);

  for (index in planets) {
    //Testing.
    var jPlanet = planets[index];
    console.log(jPlanet.name);

    //Add this planet to the array.
    this.planetArr[index] = new planet(jPlanet.name, jPlanet.location, 
                                jPlanet.diameter, jPlanet.colour)

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

// Create a three.js camera.
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

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
