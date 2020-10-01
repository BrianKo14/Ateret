// import * as THREE from 'https://unpkg.com/three@0.121.1/build/three.min.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.121.1/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.121.1/examples/jsm/controls/OrbitControls.js';

function load3D(file, domElement, size, zPos, yPos) {

	// SCENE
	var scene = new THREE.Scene();
	scene.background = new THREE.Color('#ffffff');

	var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	// camera.rotation.x = 60;
	// camera.position.x = 800;
	camera.position.y = yPos;
	camera.position.z = zPos;

	var renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize(size[0], size[1]);

	domElement.appendChild(renderer.domElement);


	// ORBIT
	let controls = new OrbitControls(camera, domElement.firstChild);
	controls.autoRotate = true;
	controls.enablePan = false;
	controls.enableZoom = false;
	controls.minAzimuthAngle = 45;
	controls.minAzimuthAngle = 45;


	// LOADER
	var loader = new GLTFLoader();
	loader.load(file, function (gltf){
		scene.add(gltf.scene);
	}, undefined, function (error){
		console.error(error);
	});


	// LIGHT
	var hlight = new THREE.AmbientLight(0x404040, 10);
	scene.add(hlight);

	var directionalLight = new THREE.DirectionalLight(0xffffff, 2);
	directionalLight.position.set(0,1,0);
	directionalLight.castShadow = true;
	scene.add(directionalLight);


	// LOOP
	function animate() {
		requestAnimationFrame( animate );

		controls.update();

		renderer.render( scene, camera );
	}
	animate();
}


var url = window.location.pathname.split('/');
url = url[url.length - 1];

if (url == "cocinas.html") {
	const pvc = document.getElementById('3D-pvc');
	load3D('3d_models/box.glb', pvc, [0.6 * window.innerWidth/2, 0.6* window.innerHeight/2], 3, 0);
}
else if (url == "electrodomesticos.html") {

}