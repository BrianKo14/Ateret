// import * as THREE from 'https://unpkg.com/three@0.121.1/build/three.min.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.121.1/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.121.1/examples/jsm/controls/OrbitControls.js';

const kitchenViewer = document.getElementById('3D-kitchen');

// SCENE
var scene = new THREE.Scene();
scene.background = new THREE.Color('#ffffff');

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.rotation.y = 0;
// camera.position.x = 800;
camera.position.y = 0;
camera.position.z = 6;

var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize( window.innerWidth/2, window.innerHeight/2 );

kitchenViewer.appendChild(renderer.domElement);


// ORBIT
let controls = new OrbitControls(camera, kitchenViewer.firstChild);
controls.autoRotate = true;
// controls.addEventListener('change', animate);


// LOADER
var loader = new GLTFLoader();
loader.load( '3d_models/box.glb', function (gltf){
	scene.add(gltf.scene);
}, undefined, function (error){
	console.error(error);
});


// LIGHT
var hlight = new THREE.AmbientLight(0x404040, 10);
scene.add(hlight);

// var directionalLight = new THREE.DirectionalLight(0xffffff,100);
// directionalLight.position.set(0,1,0);
// directionalLight.castShadow = true;
// scene.add(directionalLight);


// LOOP
function animate() {
    requestAnimationFrame( animate );

    controls.update();

	renderer.render( scene, camera );
}
animate();