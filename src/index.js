import * as Croquet from '@croquet/croquet';
import * as THREE from 'three';

import './style.css';
import Logo from './logo-small.png';

import printMe from './print.js';


class BoxModel extends Croquet.Model {
  init(options={}) {
    super.init(options);
    console.log("BoxModel init");
    this.position = new THREE.Vector3(.5,0,0);
    
    console.log("initialPos:" + this.position.x);
    this.future(50).step();
  }

  static types() {
    return {
      "THREE.Vector3": THREE.Vector3,        // serialized as '{"x":...,"y":...,"z":...}'
      "THREE.Quaternion": THREE.Quaternion,
    };
  }

  step(){
    var newPos = this.position;
    newPos.x += .001;
    this.position.set(newPos.x, newPos.y, newPos.z);
    console.log("BoxModel Step");
    console.log(this.position.x);
    this.publish(this.id, 'position-changed', this.position);
    this.future(16).step();
  }
}
BoxModel.register("BoxModel");

class MyThreeView extends Croquet.View {
  constructor(model){
    super(model);

    init();
    // box in scene
    this.myBoxGeo = new THREE.BoxGeometry(1,1,1);
    this.myBoxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 } );
    this.myBoxMesh = new THREE.Mesh(this.myBoxGeo, this.myBoxMaterial);
    
    scene.add(this.myBoxMesh);

    this.subscribe(model.id, {event: 'position-changed', handling:'oncePerFrame'}, this.move);
  }

  move(position){
    this.myBoxMesh.position.x = position.x;
  }

  update(time){
    renderer.render( scene, camera );
  }
}

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
  camera.position.set( 0, .2, 5 );

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
  scene.add( ambientLight );
  scene.add( light );

  // Button test
  // const btn = document.createElement('button');
  // btn.innerHTML = 'Click me and check the console!';
  // btn.onclick = printMe;
  // container.appendChild(btn);

}

// EVENT HANDLERS
window.addEventListener( 'resize', onWindowResize );
function onWindowResize() {

  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight;

  renderer.setSize( canvasWidth, canvasHeight );

  camera.aspect = canvasWidth / canvasHeight;
  camera.updateProjectionMatrix();
}


Croquet.Session.join({
  appId: "com.lucasrumney.A",
  apiKey: "12E0A40C1bH8JzlbaElBkr8K2FArP18uHgjJFko50",
  name: "A",
  password: "secret",
  model: BoxModel,
  view: MyThreeView
});