// Global variables
var GLOBAL_SCALE = 50;
var WIREFRAME = false;
var MESH_SCALE = 100;

// Constructor for the planet object
function planet(planetName, planetVector, planetDiameter, planetColour, planetType)
{
    // Store member variables
    this.name = planetName;
    this.position = new THREE.Vector3(planetVector[0] * GLOBAL_SCALE, planetVector[1] * GLOBAL_SCALE, planetVector[2] * GLOBAL_SCALE);
    this.diameter = planetDiameter/1000;
    this.colour = planetColour;

    // Create the geometry for this planet
    this.geometry = new THREE.SphereGeometry(toAstronomicalUnits(planetDiameter) * 0.5 * GLOBAL_SCALE, 32, 32);


    var heightMap;

    // Load the texture (Maybe this should only be done once.....?)
    switch(this.planetType) {
    case "earth":
        heightMap = new THREE.TextureLoader().load("res/planetEarth.jpg");
        break;
    case "gas":
        heightMap = new THREE.TextureLoader().load("res/planetGas.jpg");
        break;
    case "solid":
        heightMap = new THREE.TextureLoader().load("res/planetSolid.jpg");
        break;
    default:
        //Default to solid.
        default heightMap = new THREE.TextureLoader().load("res/planetSolid.jpg");  
}

    
    heightMap.anisotropy = 4;
    heightMap.repeat.set( 0.998, 0.998 );
    heightMap.offset.set( 0.001, 0.001 );
    heightMap.wrapS = heightMap.wrapT = THREE.RepeatWrapping;
    heightMap.format = THREE.RGBFormat;

    // Create the material for this planet
    var args = {};
    if (WIREFRAME == true) args['wireframe'] = true;
    this.material = new THREE.MeshLambertMaterial(args);
    this.material.color = new THREE.Color(planetColour);
    this.material.map = heightMap;
    this.material.colour 

    // Create the mesh for this planet.
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    this.mesh.scale.set(MESH_SCALE, MESH_SCALE, MESH_SCALE);

    // Renders this planet into the scene
    //this.render = function (name) {
    //    this.lastName = name;
    //};

    // Set the position of this
}



//Example usage
//var earth = new planet("Earth","vector", 221321);
//earth.retCirc();

// Converts input kilometers to astronomical units
function toAstronomicalUnits(km) {
  return km * Math.pow(6.68459,-9)
}
