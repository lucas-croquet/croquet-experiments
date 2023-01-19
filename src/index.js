import * as Croquet from "@croquet/croquet";
import * as THREE from "three";

import "./style.css";
import Logo from "./logo-small.png";

import printMe from "./print.js";
import { Box } from "./box.js";

class GameModel extends Croquet.Model {
  init(options = {}) {
    super.init(options);
    console.log("GameModel init");
    // this.children = [];
    // this.children.push(BoxModel.create({sceneModel: this}));
    this.future(50).step();

    var myBox = new Box();
  }

  step() {}
}
GameModel.register("GameModel");

class GameView extends Croquet.View {
  constructor(model) {
    console.log("GameView Constructor");
    super(model);
    this.model = model;
    this.init();

    // EVENT HANDLERS
    window.addEventListener("resize", this.onWindowResize);
  }

  init() {
    // Basic Three Scene
    const container = document.createElement("div");
    document.body.appendChild(container);

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    // CAMERA
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 8000);
    this.camera.position.set(0, 0.2, 5);

    // LIGHTS
    this.ambientLight = new THREE.AmbientLight(0x333333);

    this.light = new THREE.DirectionalLight(0xffffff, 1.0);
    this.light.position.set(0.32, 0.39, 0.7);

    // RENDERER
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(canvasWidth, canvasHeight);
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.setClearAlpha(0.9);
    this.renderer.domElement.classList.add("threeCanvas");
    container.appendChild(this.renderer.domElement);

    // image file
    const croquetLogo = new Image();
    croquetLogo.src = Logo;

    // EVENTS
    window.addEventListener("resize", this.onWindowResize);

    // CONTROLS
    // cameraControls = new OrbitControls( camera, renderer.domElement );
    // cameraControls.addEventListener( 'change', render );

    // scene itself
    this.scene = new THREE.Scene();
    this.scene.add(this.ambientLight);
    this.scene.add(this.light);

    // Button test
    // const btn = document.createElement('button');
    // btn.innerHTML = 'Click me and check the console!';
    // btn.onclick = printMe;
    // container.appendChild(btn);
  }

  onWindowResize() {
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    renderer.setSize(canvasWidth, canvasHeight);

    camera.aspect = canvasWidth / canvasHeight;
    camera.updateProjectionMatrix();
  }

  update(time) {
    this.renderer.render(this.scene, this.camera);
  }
}

Croquet.Session.join({
  appId: "com.lucasrumney.A",
  apiKey: "12E0A40C1bH8JzlbaElBkr8K2FArP18uHgjJFko50",
  name: "A",
  password: "secret",
  model: GameModel,
  view: GameView,
});
