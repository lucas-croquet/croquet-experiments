import * as Croquet from '@croquet/croquet';
import * as THREE from 'three';

import './style.css';
import Logo from './logo-small.png';

import printMe from './print.js';


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
  camera.position.set( 0,0,4 );

  // LIGHTS
  ambientLight = new THREE.AmbientLight( 0x333333 );

  light = new THREE.DirectionalLight( 0xFFFFFF, 1.0 );
  light.position.set( 0.32, 0.39, 0.7 );

  // RENDERER
  renderer = new THREE.WebGLRenderer( {alpha: true, antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( canvasWidth, canvasHeight );
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setClearAlpha(.9);
  renderer.domElement.classList.add('threeCanvas')
  container.appendChild( renderer.domElement );

  // image file
  const croquetLogo = new Image();
  croquetLogo.src = Logo;
  
  // EVENTS
  window.addEventListener( 'resize', onWindowResize );

  // CONTROLS
  // cameraControls = new OrbitControls( camera, renderer.domElement );
  // cameraControls.addEventListener( 'change', render );

  // scene itself
  scene = new THREE.Scene();
  
  // box in scene
  var myBoxGeo = new THREE.BoxGeometry(1,1,1);
  var myBoxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 } );
  var myBoxMesh = new THREE.Mesh(myBoxGeo, myBoxMaterial);
  scene.add(myBoxMesh);

  scene.add( ambientLight );
  scene.add( light );

  // Button test
  // const btn = document.createElement('button');
  // btn.innerHTML = 'Click me and check the console!';
  // btn.onclick = printMe;
  // container.appendChild(btn);


}

// render
function render() {
  renderer.render( scene, camera );
}


// EVENT HANDLERS
window.addEventListener( 'resize', onWindowResize );
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