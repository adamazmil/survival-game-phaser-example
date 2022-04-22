import knight from "../assets/sprites/knight.png";
import knightJSON from "../assets/sprites/knight_atlas.json";
import knightAnimJSON from "../assets/sprites/knight_anim.json";
import Camel from "./Camel.js";
export default class Player extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let { scene, x, y, texture, frame } = data;
    super(scene.matter.world, x, y, texture, frame);
    this.scene.add.existing(this);

    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    var playerCollider = Bodies.circle(this.x, this.y, 12, {
      isSensor: false,
      label: "playerCollider",
    });
    var playerSensor = Bodies.circle(this.x, this.y, 24, {
      isSensor: true,
      label: "playerSensor",
    });
    const compoundBody = Body.create({
      parts: [playerCollider, playerSensor],
      frictionAir: 0.35,
    });
    this.setExistingBody(compoundBody);
    this.setFixedRotation();
    let movePath = [];
    let moveToTarget;
  }

  moveAlong(path) {
    if (!path || path.length <= 0) {
      return;
    }

    this.movePath = path;
    this.moveTo(this.movePath.shift());
  }
  moveTo(target) {
    this.moveToTarget = target;
  }

  static preload(scene) {
    scene.load.atlas("knight", knight, knightJSON);
    scene.load.animation("knight_anim", knightAnimJSON);
  }
  get velocity() {
    return this.body.velocity;
  }
  update() {
    const speed = 2.5;

    //keyboard controls

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
    if (Phaser.Input.Keyboard.JustDown(this.inputKeys.pet)) {
      let camel = new Camel({
        scene: this.scene,
        x: 50,
        y: 50,
        texture: "archer",
        frame: "archer_idle_1",
      });
      this.scene.add.existing(camel);
    }
    playerVelocity.normalize();
    playerVelocity.scale(speed);
    this.setVelocity(playerVelocity.x, playerVelocity.y);
    if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) {
      this.anims.play("knight_walk", true);
    } else {
      this.anims.play("knight_idle", true);
    }
    if (this.velocity.x < -0.1) {
      this.setFlipX(true);
    } else if (this.velocity.x > 0.1) this.setFlipX(false);

    // // Click movement- path follow
    // let dx = 0;
    // let dy = 0;
    // if (this.moveToTarget) {
    //   dx = this.moveToTarget.x - this.x;
    //   dy = this.moveToTarget.y - this.y;

    //   if (Math.abs(dx) < 5) {
    //     dx = 0;
    //   }
    //   if (Math.abs(dy) < 5) {
    //     dy = 0;
    //   }
    //   if (dx === 0 && dy === 0) {
    //     if (this.movePath.lenght > 0) {
    //       this.moveTo(this.movePath.shift());
    //       return;
    //     }
    //     this.moveToTarget = undefined;
    //   }

    //   const leftDown = dx < 0;
    //   const rightDown = dx > 0;
    //   const upDown = dy < 0;
    //   const downDown = dy > 0;

    //   if (leftDown) {
    //     this.anims.play("knight_walk", true);
    //     this.setVelocity(-speed, 0);
    //     this.setFlipX(true);
    //   } else if (rightDown) {
    //     this.anims.play("knight_walk", true);
    //     this.setVelocity(speed, 0);
    //     this.setFlipX(false);
    //   } else if (upDown) {
    //     this.anims.play("knight_walk", true);
    //     this.setVelocity(0, -speed);
    //   } else if (downDown) {
    //     this.anims.play("knight_walk", true);
    //     this.setVelocity(0, speed);
    //   } else {
    //     this.anims.play("knight_idle", true);
    //     this.setVelocity(0, 0);
    //   }
  }
}
