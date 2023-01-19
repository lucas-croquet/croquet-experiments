import * as Croquet from "@croquet/croquet";
import * as THREE from "three";

export class Box {
  constructor() {
    this.gameModel = Croquet.Model.wellKnownModel("GameModel");
    this.model = BoxModel.create({ gameModel: this.gameModel });
    this.view = new BoxView(this.model);
    this.view.attachToView(this.model.session.view);
  }
}

class BoxModel extends Croquet.Model {
  init(options = {}) {
    super.init(options);
    console.log("BoxModel init");
    this.position = new THREE.Vector3(0.5, 0, 0);

    console.log("initialPos:" + this.position.x);
    this.future(100).step();
  }

  static types() {
    return {
      "THREE.Vector3": THREE.Vector3, // serialized as '{"x":...,"y":...,"z":...}'
      "THREE.Quaternion": THREE.Quaternion,
    };
  }

  step() {
    var newPos = this.position;
    newPos.x += 0.005;
    this.position.set(newPos.x, newPos.y, newPos.z);
    console.log("BoxModel Step");
    console.log(this.position.x);
    this.publish(this.id, "position-changed", this.position);
    this.future(50).step();
  }
}
BoxModel.register("BoxModel");

class BoxView extends Croquet.View {
  constructor(model) {
    super(model);
    console.log("BoxView Constructor");

    // box in scene
    this.myBoxGeo = new THREE.BoxGeometry(1, 1, 1);
    this.myBoxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.myBoxMesh = new THREE.Mesh(this.myBoxGeo, this.myBoxMaterial);

    this.subscribe(model.id, { event: "position-changed", handling: "oncePerFrame" }, this.move);

    //this.attachToView(this.session.view);
  }

  attachToView(gameView) {
    gameView.add(new BoxView(this.gameModel).myBoxMesh);
  }

  move(position) {
    this.myBoxMesh.position.x = position.x;
  }
}
