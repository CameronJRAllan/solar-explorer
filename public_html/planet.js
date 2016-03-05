function planet(planetName, planetVector, planetDiameter, planetColour) {
    this.name = planetName;

    this.vector = new THREE.Vector3(parseInt(planetVector.x * 50),   //Our actual final vector.
                                    parseInt(planetVector.y * 50), 
                                    parseInt(planetVector.z * 50));

    this.diameter = planetDiameter/1000;
    this.colour = planetColour;

    //Second and third values are essentially detail level.
    this.geometry = new THREE.SphereGeometry(planetDiameter/2, 32, 32);
    this.geometry.scale(10);

    this.material = new THREE.MeshBasicMaterial( {color: 0xffff00});

    this.mesh = new THREE.Mesh(this.geometry, this.material); 

    this.mesh.position.set(this.vector.x, this.vector.y, this.vector.z); //Set mesh's position to vector.

    //Example method.
    //this.retCirc = function () { return ( Math.PI * this.radius * 2 ); };
}

//Example usage
//var earth = new planet("Earth","vector", 221321);
//earth.retCirc();
