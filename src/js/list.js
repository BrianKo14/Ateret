import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import images from '../images/*.glb'
import { EventDispatcher } from 'three';

export var currentSite = "home";

var pos, selected;

var dlNames, dsNames;
var length, height, width;

export function startSite(name) {
    // Set jQuery name for this site
    currentSite = name;
    dlNames = `#${currentSite}-bg .bg-container .dynamic-list .dl-row`;
    dsNames = `#${currentSite}-bg .bg-container .dynamic-slideshow .ds-row`;

    // Get number of rows
    length = $(dlNames).length;

    $(dlNames).each(function() {
        // Get rows' size
        height = parseInt($(this).css('height').replace('%', ''));
        width = parseInt($(this).css('width').replace('%', ''));

        // Attach mobile click event listener
        if (isMobile) {
            $(this).click(() => {
                $(`#${currentSite}-bg .bg-container .dynamic-slideshow`).css('display', 'block');
                $(`#${currentSite}-bg .bg-container .dynamic-list`).css('display', 'none');
                $(`#${currentSite}-bg .bg-container .goback`).css('display', 'block');
            });
        }

        // 3D
        // const size = [200, 200];
        // load3D(images['box'], $(".dl-pic", this).get(0), size, 3, 0);

    });  

    // Go back button
    $(`#${currentSite}-bg .bg-container .goback`).click(() => {
        $(`#${currentSite}-bg .bg-container .dynamic-slideshow`).css('display', 'none');
        $(`#${currentSite}-bg .bg-container .dynamic-list`).css('display', 'block');
        $(`#${currentSite}-bg .bg-container .goback`).css('display', 'none');
    });

    pos = selected = 0;

    slide();
}

export function endSite() {
    loadedElements.forEach(element => {
        if (loadedElements != []) element.remove();
        currentSite = "home";
    });
}

function slide() {
    $(dlNames).each(function(indx) {
        // Math functions: https://www.desmos.com/calculator/zn2tmgp3k5

        // Position
        const x = (pos - indx) - 0;
        const w = -1, a = -20, h = -15.2;
        const part = (Math.tanh( (a*x/w) - a*Math.floor(x/w) - a/2) ) / (2*Math.tanh(a/2));
        const offset = h * (part + 0.5 + Math.floor(x/w));

        $(this).css('top', (50 - height/2 - offset) + '%');

        // Size
        const sigma = 0.9;
        var size = (1/(sigma*Math.sqrt(2*Math.PI))) * Math.exp((-0.5)*((indx - pos)/sigma)**2) + 0.8;
        size *= 0.8;
        $(this).css('transform', `scale(${size})`);

        // Z-index
        $(this).css('z-index', Math.round(20 + size*10))

        // Opacity
        $(this).css('opacity', `${size**7}`);


        // Selected
        if (Math.abs(pos - indx) < 0.5) {
            selected = indx;

            // Show slideshow
            $(dsNames).each(function(dsIndx) {
                if (dsIndx == selected) {
                    $(dsNames).eq(dsIndx).css('display', 'block');
                } else {
                    $(dsNames).eq(dsIndx).css('display', 'none');
                }
            });
        }
    });
}

// LIST SCROLLING
var yPosBuffer = 0;
if (!isMobile) {
    // PC Scrolling

    $(document).on('wheel', function(e) { // Not working on Firefox !!!
        const delta = e.originalEvent.wheelDelta * -0.008;
    
        if (pos + delta >= 0 && pos + delta <= length - 1) {
            pos += delta;
            slide();
        }
    });
}
else {
    // Mobile swipe

    $(document).on('touchstart', function(e) {
        yPosBuffer = e.touches[0].screenY
    });

    $(document).on('touchmove', function(e) { 
        const delta = (e.touches[0].screenY - yPosBuffer) * -0.006;

        if (pos + delta >= 0 && pos + delta <= length - 1) {
            pos += delta;
            slide();
        }

        yPosBuffer = e.touches[0].screenY;
    });
}    


// 3D Renderer
var loadedElements = [];
function load3D(file, domElement, size, zPos, yPos) {

	// SCENE
	var scene = new THREE.Scene();
	// scene.background = new THREE.Color('#ffffff');

    var camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
	camera.position.y = yPos;
    camera.position.z = zPos;
    camera.position.x = Math.sin(Math.random() * Math.PI * 2) * zPos * 0.8;

	var renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});
    renderer.setSize(size[0], size[1]);
    renderer.setClearColor( 0x000000, 0 );
    renderer.setPixelRatio( window.devicePixelRatio * 0.3);

    domElement.appendChild(renderer.domElement);
    loadedElements.push(renderer.domElement);


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
