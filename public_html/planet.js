function planet(planetName, planetVector, planetDiameter, planetColour) {
    this.name = planetName;

    this.vector = new THREE.Vector3(parseInt(planetVector.x * 50),   //Our actual final vector.
                                    parseInt(planetVector.y * 50), 
                                    parseInt(planetVector.z * 50));

    this.diameter = planetDiameter/1000;
    this.colour = planetColour;

    //Second and third values are essentially detail level.
    console.log(planetDiameter*0.5);
    this.geometry = new THREE.SphereGeometry(planetDiameter*0.5*50*Math.pow(6.68459,-9), 32, 32);
    console.log(planetDiameter*0.5*Math.pow(6.68459,-9));

    this.material = new THREE.MeshBasicMaterial( {color: Math.random() * 0xffffff} );
//    this.material = new THREE.MeshNormalMaterial();

    this.mesh = new THREE.Mesh(this.geometry, this.material); 

    this.mesh.position.set(this.vector.x, this.vector.y, this.vector.z); //Set mesh's position to vector.

    //Example method.
    //this.retCirc = function () { return ( Math.PI * this.radius * 2 ); };
}

//Example usage
//var earth = new planet("Earth","vector", 221321);
//earth.retCirc();
