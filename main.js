import "/style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import * as POSTPROCESSING from "postprocessing";

/**
 * Base
 */
let composer;

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

const dirLight = new THREE.DirectionalLight(16777215, 0.49);
dirLight.position.set(0, 1, -10);
dirLight.lookAt(0, 0, 0);
scene.add(dirLight);
const spotLight = new THREE.SpotLight(16777215, 1, 1);
spotLight.intensity = 1.853;
spotLight.penumbra = 0;
spotLight.angle = 1.571;
spotLight.decay = -178;
spotLight.power = 5.58;
spotLight.position.set(2.27, 2.24, -305);
scene.add(spotLight);

const group = new THREE.Object3D();

// Texture Loader
const textureLoader = new THREE.TextureLoader();

// Instantiate a loader
const loader = new GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/libs/draco/");
loader.setDRACOLoader(dracoLoader);

// Load a glTF resource
loader.load(
  // resource URL
  "/models/eye_singular.glb",
  // called when the resource is loaded
  function (gltf) {
    const eye = gltf.scene.children[0];
    eye.name = "eye";
    group.add(eye);
    group.rotation.x = -0.961;
    group.rotation.y = -0.08;
    group.rotation.z = 0.2;
    group.position.x = -0.11;
    group.position.y = 0.83;
    group.position.z = -298;
    const texture = textureLoader.load("/textures/eye_texture.jpg");
    texture.center.x = 0.5;
    texture.center.y = 0.5;
    texture.repeat.set(4, 4);
    console.log("texture", texture);
    eye.material = new THREE.MeshStandardMaterial({
      metalness: 0.12,
      roughness: 0.55,
      color: 7899597,
      transparent: !0,
      opacity: 0.97,
      map: texture,
      flatShading: !1,
    });
  },
  // called while loading is progressing
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  // called when loading has errors
  function (error) {
    console.log("An error happened");
  }
);

// Sun
const sunColor = new THREE.Color(15384750).convertSRGBToLinear();
const sunLight = new THREE.PointLight(sunColor);
sunLight.position.set(0.36, -2.454, 0);
group.add(sunLight);

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
group.add(sun);
scene.add(group);

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
  composer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  1,
  8e3
);
camera.position.set(0, 0, -305);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enabled = false;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// postprocessing

const areaImage = new Image();
areaImage.src = POSTPROCESSING.SMAAEffect.areaImageDataURL;
const searchImage = new Image();
searchImage.src = POSTPROCESSING.SMAAEffect.searchImageDataURL;
const smaaEffect = new POSTPROCESSING.SMAAEffect(searchImage, areaImage, 1);

const godRaysEffect = new POSTPROCESSING.GodRaysEffect(camera, sun, {
  height: 480,
  kernelSize: POSTPROCESSING.KernelSize.SMALL,
  density: 0.8,
  decay: 0.9,
  weight: 0.7,
  exposure: 0.9,
  samples: 35,
  clampMax: 1,
});
const renderPass = new POSTPROCESSING.RenderPass(scene, camera);
const effectPass = new POSTPROCESSING.EffectPass(camera, smaaEffect ,godRaysEffect);
effectPass.renderToScreen = true;

composer = new POSTPROCESSING.EffectComposer(renderer);
composer.addPass(renderPass);
composer.addPass(effectPass);

/**
 * Animate
 */
const clock = new THREE.Clock();
const tick = () => {
  // Update controls
  controls.update();
  const elapsedTime = clock.getElapsedTime();
  // update uTime
  // material.uniforms.uTime.value = elapsedTime;

  // Render
  // renderer.render(scene, camera);
  composer.render()
  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
