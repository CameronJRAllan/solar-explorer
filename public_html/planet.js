function planet(planetName, planetVector, planetDiameter, planetColour) {
    this.name = planetName;

    var tempVector = planetVector.split(" +"); //Splits by one or more spaces, regex

    //Now remove the [ in the first item and the ] in the last.
    tempVector[0].slice(1); //Remove [.
    tempVector[2].slice(0, -1) //Remove ]. (Negative numbers are relative to the end).

    this.vector = new Three.Vector3(parseInt(vector[0]),   //Our actual final vector.
                                    parseInt(vector[1]), 
                                    parseInt(vector[2]));

    this.diameter = planetDiameter;
    this.colour = planetColour;

    //Second and third values are essentially detail level.
    this.geometry = new THREE.SphereGeometry(planetDiameter/2, 32, 32);

    this.material = new THREE.MeshBasicMaterial( {color: colour});

    this.mesh = new THRE.mesh(geometry, material); 

    this.mesh.position.set(vector); //Set mesh's position to vector.

    //Example method.
    //this.retCirc = function () { return ( Math.PI * this.radius * 2 ); };
}

//Example usage
//var earth = new planet("Earth","vector", 221321);
//earth.retCirc();