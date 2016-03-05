function planet(planetName, planetVector, planetDiameter, planetColour) {
    this.name = planetName;

    this.vector = new THREE.Vector3(parseInt(planetVector.x * 50),   //Our actual final vector.
                                    parseInt(planetVector.y * 50), 
                                    parseInt(planetVector.z * 50));

    this.diameter = planetDiameter/1000;
    this.colour = planetColour;

    //Second and third values are essentially detail level.
    this.geometry = new THREE.SphereGeometry(planetDiameter/20000, 32, 32);
    console.log(planetDiameter);

    var heightMap = new THREE.TextureLoader().load( "res/planetBump.jpg");

    heightMap.anisotropy = 4;
    heightMap.repeat.set( 0.998, 0.998 );
    heightMap.offset.set( 0.001, 0.001 );
    heightMap.wrapS = heightMap.wrapT = THREE.RepeatWrapping;
    heightMap.format = THREE.RGBFormat;



    var material = new THREE.MeshPhongMaterial( {
        color: color: Math.random() * 0xffffff,
        specular: 0x222222,
        shininess: 25,
        bumpMap: heightMap,
        bumpScale: 12
    } );


//    this.material = new THREE.MeshNormalMaterial();

    this.mesh = new THREE.Mesh(this.geometry, this.material); 

    this.mesh.position.set(this.vector.x, this.vector.y, this.vector.z); //Set mesh's position to vector.

    //Example method.
    //this.retCirc = function () { return ( Math.PI * this.radius * 2 ); };
}

//Example usage
//var earth = new planet("Earth","vector", 221321);
//earth.retCirc();
