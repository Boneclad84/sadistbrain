import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innderHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const loader = new OBJLoader();
renderer.setSize(window.innerWidth, window.innerHeight);
documentbody.appendChild(renderer.domElement)

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
    color: 0xff000
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

loader.load(
	'Brain.obj',
	// called when resource is loaded
	function ( object ) {

		scene.add( object );

	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

camera.position.z = 5;

function animate(){
    requestAnimationFrame(animate);

    object.rotation.x += 0.01;
    object.rotation.y += 0.01;

    renderer.render(scene, camera);
}


animate();


