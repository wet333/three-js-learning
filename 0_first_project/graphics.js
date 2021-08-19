// Viewport
const canvas = document.getElementById('webgl');
const sizes = { h: 300, w: 500 };

// Scene
const scene = new THREE.Scene();

// Cube
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({ color: '#125472'});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.w / sizes.h , 1, 1000);
camera.position.z = 5;

scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.w, sizes.h);

// Animation
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

}
animate();