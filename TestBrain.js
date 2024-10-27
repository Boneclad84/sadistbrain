import * as THREE from 'three';
import MTLLoader from 'three-mtl-loader';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)
const raycaster = new THREE.Raycaster();
document.addEventListener('mousedown', onMouseDown);

function onMouseDown(event) {
    const coords = new THREE.Vector2(
        (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
        -((event.clientY / renderer.domElement.clientHeight) * 2 - 1),
    )
    raycaster.setFromCamera(coords, camera);
    const intersections = raycaster.intersectObjects(scene.children, true);
    if (intersections.length > 0){
        console.log(intersections[0]);
    }
}

let colorDict = new Map();
colorDict.set("us", 0xf54242);
colorDict.set("asia", 0x4245f5);
colorDict.set("africa", 0x42f54e);
colorDict.set("europe", 0xeff542);

let frontalLobeDict = new Map();
frontalLobeDict.set("total", 500);
frontalLobeDict.set("us", 0);
frontalLobeDict.set("asia", 50);
frontalLobeDict.set("africa", 120);
frontalLobeDict.set("europe", 90);

let parietalLobeDict = new Map();
parietalLobeDict.set("total", 600);
parietalLobeDict.set("us", 610)
parietalLobeDict.set("europe", 400);


let temporalLobeDict = new Map();
temporalLobeDict.set("total", 800);
temporalLobeDict.set("asia", 300);
temporalLobeDict.set("africa", 300);

let brainstemDict = new Map();
brainstemDict.set("total", 300);

let cerebellumDict = new Map();
cerebellumDict.set("total", 400);
cerebellumDict.set("us", 50);

let occipitalLobeDict = new Map();
occipitalLobeDict.set("total", 300);
occipitalLobeDict.set("asia", 250);
occipitalLobeDict.set("europe", 40);

let interlobarDict = new Map();
interlobarDict.set("total", 300);
interlobarDict.set("us", 0);
interlobarDict.set("asia", 100);
interlobarDict.set("europe", 170);
interlobarDict.set("africa", 140);

let limbicLobeDict = new Map();
limbicLobeDict.set("total", 300);
limbicLobeDict.set("us", 0);
limbicLobeDict.set("asia", 90);
limbicLobeDict.set("europe", 70);
limbicLobeDict.set("africa", 150);


function returnMat( section ){
    var max = 0;
    var tempColor = "0x757574";
    var tempOpacity = 0.5;
    for (const key of section.keys()){
        if ((key != "total") && (section.get(key) > max)){
            max = section.get(key);
            tempColor = colorDict.get(key);
            tempOpacity = 0.5 + 0.5 * section.get(key)/section.get("total");
        }
    }
    return [tempColor, tempOpacity];
}

var controls = new OrbitControls(camera, renderer.domElement);
controls.enableDampening = true;
controls.campingFactor = 0.25;
controls.enableZoom = true;

/*
var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);
*/

const loader = new GLTFLoader();

loader.load( 'BrainSections.gltf', function ( gltf ) {
    
	scene.add( gltf.scene );
    var tempMat;

    tempMat = returnMat(cerebellumDict);
    gltf.scene.children[0].children[0].traverse( function ( child ) {
		if ( child.isMesh  || child.isLine) {
			child.material = new THREE.MeshBasicMaterial({
                color: tempMat[0],
                transparent: true,
                opacity: tempMat[1]
            });
		}
	});

    tempMat = returnMat(brainstemDict);
    gltf.scene.children[0].children[1].traverse( function ( child ) {
		if ( child.isMesh  || child.isLine) {
			child.material = new THREE.MeshBasicMaterial({
                color: tempMat[0],
                transparent: true,
                opacity: tempMat[1]
            });
		}
	});

    tempMat = returnMat(frontalLobeDict);
    gltf.scene.children[0].children[2].traverse( function ( child ) {
		if ( child.isMesh  || child.isLine) {
			child.material = new THREE.MeshBasicMaterial({
                color: tempMat[0],
                transparent: true,
                opacity: tempMat[1]
            });
		}
	});

    tempMat = returnMat(limbicLobeDict);
    gltf.scene.children[0].children[3].traverse( function ( child ) {
		if ( child.isMesh  || child.isLine) {
			child.material = new THREE.MeshBasicMaterial({
                color: tempMat[0],
                transparent: true,
                opacity: tempMat[1]
            });
		}
	});

    tempMat = returnMat(occipitalLobeDict);
    gltf.scene.children[0].children[4].traverse( function ( child ) {
		if ( child.isMesh  || child.isLine) {
			child.material = new THREE.MeshBasicMaterial({
                color: tempMat[0],
                transparent: true,
                opacity: tempMat[1]
            });
		}
	});

    tempMat = returnMat(parietalLobeDict);
    gltf.scene.children[0].children[5].traverse( function ( child ) {
		if ( child.isMesh  || child.isLine) {
			child.material = new THREE.MeshBasicMaterial({
                color: tempMat[0],
                transparent: true,
                opacity: tempMat[1]
            });
		}
	});

    tempMat = returnMat(temporalLobeDict);
    gltf.scene.children[0].children[6].traverse( function ( child ) {
		if ( child.isMesh  || child.isLine) {
			child.material = new THREE.MeshBasicMaterial({
                color: tempMat[0],
                transparent: true,
                opacity: tempMat[1]
            });
		}
	});

    tempMat = returnMat(interlobarDict);
    gltf.scene.children[0].children[7].traverse( function ( child ) {
		if ( child.isMesh  || child.isLine) {
			child.material = new THREE.MeshBasicMaterial({
                color: tempMat[0],
                transparent: true,
                opacity: tempMat[1]
            });
		}
	});
    
   //console.log(gltf.scene);

}, undefined, function ( error ) {

	console.error( error );

} );

renderer.setClearColor( 0xffffff, 0);
scene.background = new THREE.Color( 0x292929 );

camera.position.z = 0.25;

function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();


