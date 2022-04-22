import archer from "../assets/sprites/archer.png";
import archerJSON from "../assets/sprites/archer_atlas.json";
import archerAnimJSON from "../assets/sprites/archer_anim.json";
//import { Camera } from "phaser";

export default class Camel extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let { scene, x, y, texture, frame } = data;
    super(scene.matter.world, x, y, texture, frame);

    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    var playerCollider = Bodies.circle(this.x, this.y, 12, {
      isSensor: false,
      label: "camelCollider",
    });
    var playerSensor = Bodies.circle(this.x, this.y, 24, {
      isSensor: true,
      label: "camelSensor",
    });
    const compoundBody = Body.create({
      parts: [playerCollider, playerSensor],
      frictionAir: 0.35,
    });
    this.setExistingBody(compoundBody);
    this.setFixedRotation();
  }
  static preload(scene) {
    scene.load.atlas("archer", archer, archerJSON);
    scene.load.animation("archer_anim", archerAnimJSON);
  }

  update() {
    const speed = 2.5;
    let playerVelocity = new Phaser.Math.Vector2();
    if (this.inputKeys.left.isDown) {
      playerVelocity.x = -1;
    } else if (this.inputKeys.right.isDown) {
      playerVelocity.x = 1;
    }
    if (this.inputKeys.up.isDown) {
      playerVelocity.y = -1;
    } else if (this.inputKeys.down.isDown) {
      playerVelocity.y = 1;
    }
    playerVelocity.normalize();
    playerVelocity.scale(speed);
    this.setVelocity(playerVelocity.x, playerVelocity.y);
    if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) {
      this.anims.play("archer_walk", true);
    } else {
      this.anims.play("archer_idle", true);
    }
    if (this.velocity.x < -0.1) {
      this.setFlipX(true);
    } else if (this.velocity.x > 0.1) this.setFlipX(false);
  }
}
