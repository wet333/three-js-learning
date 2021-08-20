import './style.css';
import * as THREE from 'three';
import GSAP from 'gsap';

// Canvas
const canvas = document.getElementById('webgl');

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({ color: 0xfafafa });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.01, 1000);
camera.position.z = 3;
scene.add(camera);

// Lightning
const light = new THREE.PointLight( 0xfafafa, 1,100);
scene.add(light);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(canvas.clientWidth, canvas.clientHeight);

// Clock
const clock = new THREE.Clock();

// Animations
//GSAP.to(mesh.position, { x: 3, duration: 2, delay: 1});

// Mouse Events
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (e) => {
    cursor.x = (e.clientX / canvas.clientWidth) - 0.5;
    cursor.y = (e.clientY / canvas.clientHeight) - 0.5;
    console.log(cursor);
});

function animation() {
    requestAnimationFrame(animation);
    renderer.render(scene, camera);

    const time = clock.getElapsedTime();

    camera.position.y = (cursor.y * -2) + 1 ;
    camera.position.x = Math.sin(cursor.x * 1.5 * Math.PI) * 4;
    camera.position.z = Math.cos(cursor.x * 1.5 * Math.PI) * 4;

    camera.lookAt(mesh.position);
    light.position.set(camera.position.x ,camera.position.y + 5,camera.position.z);
}
animation();

// Resize events
window.addEventListener('resize', onWindowResize);
window.addEventListener('load', onWindowResize);

function onWindowResize(){
	// Update camera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
	// Update renderer
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
}