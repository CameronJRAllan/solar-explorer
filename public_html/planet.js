// Global variables
var DIAMETER_SCALE = 50;
var WIREFRAME = false;
var MESH_SCALE = 100;
var DISTANCE_SCALE = 2000;

// Constructor for the planet object
function planet(planetName, planetVector, planetDiameter, planetColour, planetType)
{
    // Store member variables
    this.name = planetName;
    this.position = new THREE.Vector3(planetVector[0] * DISTANCE_SCALE, planetVector[1] * DISTANCE_SCALE, planetVector[2] * DISTANCE_SCALE);
    this.diameter = planetDiameter/1000;
    this.colour = planetColour;

    // Create the geometry for this planet
    this.geometry = new THREE.SphereGeometry(toAstronomicalUnits(planetDiameter) * 0.5 * DIAMETER_SCALE, 32, 32);


    var heightMap;

    // Load the texture (Maybe this should only be done once.....?)
    
    switch(this.name) {
    case "earth":
        heightMap = textures.earthTex;
        break;
    case "mars":
        heightMap = textures.marsTex;
        break;
    case "venusTex":
        heightMap = textures.venusTex;
        break;
    case "mercuryTex":
        heightMap = textures.mercuryTex;
        break;
    case "sunTex":
        heightMap = textures.sunTex;
        break;
    case "jupiterTex":
        heightMap = textures.jupiterTex;
        break;
    case "saturnTex":
        heightMap = textures.saturnTex;
        break;
    case "uranusTex":
        heightMap = textures.uranusTex;
        break;
    case "neptuneTex":
        heightMap = textures.neptuneTex;
        break;
    case "plutoTex":
        heightMap = textures.plutoTex;
        break;
    default:
        heightMap = textures.solidTex;
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
    this.setPosition = function(x, y, z) {
      this.position = new THREE.Vector3(x, y, z);
      this.mesh.position.set(x,y,z);
    }

}



//Example usage
//var earth = new planet("Earth","vector", 221321);
//earth.retCirc();

// Converts input kilometers to astronomical units
function toAstronomicalUnits(km) {
  return km * Math.pow(6.68459,-9)
}
