import './style.css'
import * as THREE from 'three';

const canvas = document.getElementById('webgl');
// Scene
const scene = new THREE.Scene();
// Camera
const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth/canvas.clientHeight, 0.1, 1000);
// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize( canvas.clientWidth, canvas.clientHeight );

// Object
const cube = new THREE.Mesh( new THREE.BoxGeometry(), new THREE.MeshLambertMaterial( { color: 'rgb(62, 111, 216)' } ));
const cube2 = new THREE.Mesh( new THREE.BoxGeometry(), new THREE.MeshLambertMaterial( { color: 'rgb(62, 111, 216)' } ));
const cube3 = new THREE.Mesh( new THREE.BoxGeometry(), new THREE.MeshLambertMaterial( { color: 'rgb(62, 111, 216)' } ));

const group = new THREE.Group();
scene.add(group);

group.add(cube);
group.add(cube2);
group.add(cube3);

camera.position.z = 10;

// Ligths
const lightPoint = new THREE.PointLight( 0xffffff, 1, 100 );
lightPoint.position.set( 0, 1, 2 );
scene.add( lightPoint );

const light = new THREE.AmbientLight('#404040');
scene.add( light );

// Animate
let movement = 0.01;
let rotation = Math.PI / 360;
let xScale = 0.1;
let yScale = 0.1;
let scaleAxis = 'x';

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );

	cube.rotation.x += rotation;
	cube.rotation.y += rotation;
	cube2.rotation.x += rotation * -1;
	cube2.rotation.z += rotation * -1;
	cube3.rotation.z += rotation * 0.5;
	cube3.rotation.y += rotation * -0.5;

	if(Math.abs(group.position.x) >= 1.75){
		movement = movement * -1;
	}
	group.position.x += movement;

	if(cube.scale.x > 2){
		xScale = xScale * -1;
	}
	if(cube.scale.x < 1){
		xScale = xScale * -1;

		if(scaleAxis === 'x'){
			scaleAxis = 'y';
			cube.scale.x = 1;
			cube2.scale.x = 1;
			cube3.scale.x = 1;
		}
	}

	if(cube.scale.y > 2){
		yScale = yScale * -1;
	}
	if(cube.scale.y < 1){
		yScale = yScale * -1;

		if(scaleAxis === 'y'){
			scaleAxis = 'x';
			cube.scale.y = 1;
			cube2.scale.y = 1;
			cube3.scale.y = 1;
		}
	}

	if(scaleAxis === 'x'){
		cube.scale.x += xScale;
		cube2.scale.x += xScale;
		cube3.scale.x += xScale;
	}
	if(scaleAxis === 'y'){
		cube.scale.y += yScale;
		cube2.scale.y += yScale;
		cube3.scale.y += yScale;
	}
	
}
animate();


// Resize events
window.addEventListener('resize', onWindowResize, false );
window.addEventListener('load', onWindowResize);

function onWindowResize(){
	// Update camera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
	// Update renderer
    renderer.setSize( window.innerWidth, window.innerHeight );
}