import * as Croquet from '@croquet/croquet';
import * as THREE from 'three';

// class MyModel extends Croquet.Model {

// }

// Basic Three Scene
let camera, scene, renderer;
let ambientLight, light;

function init() {
  const container = document.createElement( 'div' );
  document.body.appendChild( container );

  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight;

  // CAMERA
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 80000 );
  camera.position.set( - 600, 550, 1300 );

  // LIGHTS
  ambientLight = new THREE.AmbientLight( 0x333333 );

  light = new THREE.DirectionalLight( 0xFFFFFF, 1.0 );
  light.position.set( 0.32, 0.39, 0.7 );

  // RENDERER
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( canvasWidth, canvasHeight );
  renderer.outputEncoding = THREE.sRGBEncoding;
  container.appendChild( renderer.domElement );

  // EVENTS
  window.addEventListener( 'resize', onWindowResize );

  // CONTROLS
  // cameraControls = new OrbitControls( camera, renderer.domElement );
  // cameraControls.addEventListener( 'change', render );

  // scene itself
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xFF00000 );

  scene.add( ambientLight );
  scene.add( light );
}

// render
function render() {
  renderer.render( scene, camera );
}


// EVENT HANDLERS
function onWindowResize() {

  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight;

  renderer.setSize( canvasWidth, canvasHeight );

  camera.aspect = canvasWidth / canvasHeight;
  camera.updateProjectionMatrix();

  render();

}


init();
render();