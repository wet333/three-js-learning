import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Textures
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () =>{
    console.log("Loading Assets...");
};
loadingManager.onLoad = () => {
    console.log("Assets Successfully loaded");
};

const textureLoader = new THREE.TextureLoader(loadingManager);

const isProd = false;
let loadStr;
if(isProd){
    loadStr = '../static/';
}else{
    loadStr = '';
}

const colorTexture = textureLoader.load(loadStr + 'textures/minecraft.png');
const metalColor = textureLoader.load(loadStr + 'textures/metal/worn-shiny-metal-albedo.png');
const metalAO = textureLoader.load(loadStr + 'textures/metal/worn-shiny-metal-ao.png');
const metalHeight = textureLoader.load(loadStr + 'textures/metal/worn-shiny-metal-Height.png');
const metalNormal = textureLoader.load(loadStr + 'textures/metal/worn-shiny-metal-Normal-dx.png');
const metalRoughness = textureLoader.load(loadStr + 'textures/metal/worn-shiny-metal-Roughness.png');
const metalMetal = textureLoader.load(loadStr + 'textures/metal/worn-shiny-metal-Metallic.png');

colorTexture.minFilter = THREE.LinearFilter;
colorTexture.magFilter = THREE.NearestFilter;

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */

// Plane
const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(100,100),
    new THREE.MeshBasicMaterial({ color: 0x101010 })
);
plane.rotateX( - Math.PI / 2 );
plane.position.y = -1;
plane.receiveShadow = true;
scene.add(plane);

// 3D Objects
const cubeGeo = new THREE.BoxBufferGeometry(1, 1, 1);
const sphereGeo = new THREE.SphereBufferGeometry(0.75, 300, 300);

const mineMaterial = new THREE.MeshPhysicalMaterial({
    map: colorTexture,
    color: 0x808080,
    roughness: 100
});

const metalMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xa0a0a0,
    map: metalColor,
    normalMap: metalNormal,
    displacementMap: metalHeight,
    displacementScale: 0.05,
    metalnessMap: metalMetal,
    roughnessMap: metalRoughness,
    aoMap: metalAO
});

const cube = new THREE.Mesh(cubeGeo, mineMaterial);
cube.translateX(-1);
cube.castShadow = true;
cube.receiveShadow = true;
scene.add(cube);

const sphere = new THREE.Mesh(sphereGeo, metalMaterial);
sphere.translateX(1);
sphere.castShadow = true;
sphere.receiveShadow = true;
scene.add(sphere);

sphere.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0;
camera.position.y = 1;
camera.position.z = 5;
scene.add(camera)

// Lights
const ambientLight = new THREE.AmbientLight( 0xffffff, 0.25 );

const pointLight = new THREE.PointLight( 0xffffff , 2 );
pointLight.position.x = 0; 
pointLight.position.y = 2;
pointLight.position.z = 15;
pointLight.castShadow = true;
// light shadow quality
pointLight.shadow.autoUpdate = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;

scene.add(ambientLight, pointLight);

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = Math.PI * elapsedTime / 6;
    cube.rotation.y = Math.PI * elapsedTime / 6;

    pointLight.position.x = Math.sin( Math.PI * elapsedTime / 12 ) * 15;
    pointLight.position.z = Math.cos( Math.PI * elapsedTime / 12 ) * 15;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()