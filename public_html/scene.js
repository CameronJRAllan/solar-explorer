var DEBUG = true;

// Calls the web service and invokes the callback when the response in recieved
// The callback looks like this: function(data) where data is an array of objects
function getPlanetData(when, callback) {
  // Extract the relivant variables
  var year = when.getFullYear();
  var month = when.getMonth();
  var day = when.getDate();
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

// Camera view variables
var cameraMode = "DEFAULT";
var target = null;

// OpenGL dark magic
var scene = null;
var camera = null;
var cameraObj = null;
var controls = null;

// Invoked when the window loads and the app can be started
$(window).load(function() {
  // Create the scene
  scene = new THREE.Scene();
  scene.add(new THREE.AmbientLight(0x444444));

  // Update the planets for the first time
  updatePlanets();

  // Call the main function to start the app
  main();
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
        var planetObj = new planet(item.name, item.vector, item.diameter, item.colour);

        // Store the planet for future reference
        planets[i] = planetObj
        planetMap[item.name] = planetObj;

        // Add the planet to the scene
        scene.add(this.planets[i].getMesh());
      }
    }
  });
}


// Function that gets called whenever a key is pressed down
function onKey(event) {
  // key ','
  if (event.keyCode == 188) {
    // Lower the date by 10 days
    console.log("< key");
    time.setTime(time.getTime() - (1000*60*60*24));
    updatePlanets();
  } else if (event.keyCode == 190){
    // Lower the date by 10 days
    console.log("> key");
    time.setTime(time.getTime() + (1000*60*60*24));
    updatePlanets();
  } else if (event.keyCode == 87) {
    camera.translateZ(-10);
  } else if (event.keyCode == 83) {
    camera.translateZ(10);
  }
}
window.addEventListener('keydown', onKey, true);


// Sets the camera into target mode and targets
function targetPlanet(name) {
  // Find the planet
  var newtarget = getPlanet(name);
  if (newtarget == null) {
    console.log("Error: Attempted to target an unknown planet.");
    return;
  }

  // Set the target
  target = newtarget;

  // Move the camera to face the planet
  updateView();
}

// Updates the view of the camera
function updateView() {
  console.log("updateView has been invoked.");

  // If there is a target planet then look at the target planet
  if (target != null) {
    // The normalized angle
    var angVector = new THREE.Vector3(camera.rotation.x, camera.rotation.y, camera.rotation.z);
    // normalized angle
    var angNorm = angVector.clone().normalize();


    var newCameraPos = target.position.clone().sub(angNorm.multiplyScalar(200));
    console.log(newCameraPos);

    // Set the position of the camera to be by the planet
    camera.position.set(newCameraPos.x, newCameraPos.y, newCameraPos.z);

    // Set the angle of the camera to be be facing the planet
    //camera.lookAt(target.position);
    //console.log("lookAt has been called.");

    // debugging
    console.log("camera.position:");
    console.log(camera.position);
    console.log("camera.rotation:");
    console.log(camera.rotation);
  }

}

// The main entry point for the application that gets called after there is data and it is ok
// to start rendering things and other GL stuff.
function main() {
  // Setup three.js WebGL renderer. Note: Antialiasing is a big performance hit.
  // Only enable it if you actually need to.
  var renderer = new THREE.WebGLRenderer({antialias: false});
  renderer.setPixelRatio(window.devicePixelRatio);

  // Append the canvas element created by the renderer to document body element.
  document.body.appendChild(renderer.domElement);

  // Create the camera.
  camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 10000);
  camera.position.x = 0;//200;
  camera.position.y = 0;//200l;
  camera.position.z = 0;

  // Call updateView of the first time so the camera is in the correct position
  updateView();

  // Apply VR headset positional data to camera.
  controls = new THREE.VRControls(camera);

  // Apply VR stereo rendering to renderer.
  var effect = new THREE.VREffect(renderer);
  effect.setSize(window.innerWidth, window.innerHeight);

  // Create a VR manager helper to enter and exit VR mode.
  var params = { hideButton: false, isUndistorted: false };
  var manager = new WebVRManager(renderer, effect, params);

  // Animation loop
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
}
