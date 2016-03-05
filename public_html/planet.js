function planet(planetName, planetVector, planetDiameter, planetColour) {
    this.name = planetName;

    this.vector = new THREE.Vector3(parseInt(planetVector[0]),   //Our actual final vector.
                                    parseInt(planetVector[1]), 
                                    parseInt(planetVector[2]));

    this.diameter = planetDiameter;
    this.colour = planetColour;

    //Second and third values are essentially detail level.
    this.geometry = new THREE.SphereGeometry(planetDiameter/2, 32, 32);
    this.geometry.scale(100);

    this.material = new THREE.MeshBasicMaterial( {color: 0xffff00});

    this.mesh = new THREE.Mesh(this.geometry, this.material); 

    this.mesh.position.set(this.vector); //Set mesh's position to vector.

    //Example method.
    //this.retCirc = function () { return ( Math.PI * this.radius * 2 ); };
}

//Example usage
//var earth = new planet("Earth","vector", 221321);
//earth.retCirc();
