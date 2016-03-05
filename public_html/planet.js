function planet(planetName, planetVector, planetDiameter, planetColour) {
    this.name = planetName;
    this.vector = planetVector;
    this.diameter = planetDiameter;
    this.colour = planetColour;

    //Second and third values are essentially detail level.
    this.geometry = new THREE.SphereGeometry(planetDiameter/2, 32, 32);

    this.material = new THREE.MeshBasicMaterial( {color: colour});

    this.mesh = new THRE.mesh(geometry, material);

    //Example method.
    this.retCirc = function () { return ( Math.PI * this.radius * 2 ); };
}

//Example usage
//var earth = new planet("Earth","vector", 221321);
//earth.retCirc();