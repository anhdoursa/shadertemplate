import "/style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import flagVertexShader from "/shaders/flag/vertex.glsl";
import flagFragmentShader from "/shaders/flag/fragment.glsl";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Sun
const sunColor = new THREE.Color(15384750).convertSRGBToLinear();
const sunLight = new THREE.PointLight(sunColor);
sunLight.position.set(0.36, -2.454, 0);


scene.add(sunLight);

const sunMat = new THREE.MeshBasicMaterial({
  color: sunColor,
  transparent: true,
  fog: false,
});
const sunGeo = new THREE.SphereBufferGeometry(1.5, 32, 32);

const sun = new THREE.Mesh(sunGeo, sunMat);
sun.position.copy(sunLight.position);
sun.updateMatrix();
sun.frustumCulled = false;
sun.matrixAutoUpdate = false;
sun.name = "sun";

scene.add(sun);
/**
 * Test mesh
 */
// Geometry
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);

// Texture
const texture = new THREE.TextureLoader().load("/textures/flag-french.jpg");
console.log(texture);
// Material
const material = new THREE.ShaderMaterial({
  vertexShader: flagVertexShader,
  fragmentShader: flagFragmentShader,
  side: THREE.DoubleSide,
  uniforms: {
    uTime: { value: 0 },
    uFrequency: { value: new THREE.Vector2(10, 10) },
    uTexture: { value: texture },
  },
});

// Mesh
const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0.25, -0.25, 1);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
const tick = () => {
  // Update controls
  controls.update();
  const elapsedTime = clock.getElapsedTime();
  // update uTime
  material.uniforms.uTime.value = elapsedTime;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
