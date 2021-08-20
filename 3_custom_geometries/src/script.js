import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Canvas
const canvas = document.getElementById('webgl');

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BufferGeometry();
const count = 50;

const positionsArray = new Float32Array( count * 3 * 3 );

for (let i = 0; i < count * 3 * 3 ; i++) {
    positionsArray[i] = (Math.random() - 0.5) * 4;
}

const posAttr = new THREE.BufferAttribute(positionsArray, 3);
geometry.setAttribute('position', posAttr); 

const material = new THREE.MeshBasicMaterial({ color: 0x20cc20, wireframe: true});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 5;
scene.add(camera);

// Lights
const lPoint = new THREE.PointLight( 0xffffff, 10, 100 );
lPoint.position.set( camera.position.x, camera.position.y, camera.position.z );
scene.add(lPoint);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate
const clock = new THREE.Clock();

const animation = () =>
{
    const elapsedTime = clock.getElapsedTime();

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(animation);
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