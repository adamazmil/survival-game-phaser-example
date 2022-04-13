import Phaser from "phaser";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import MainScene from "./MainScene.js";
class MyGame extends Phaser.Scene {
  constructor() {
    super("mygame");
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 512,
  height: 512,
  backgroundColor: "#ccc",
  scene: [MainScene],
  autoCenter: true,
  scale: {
    zoom: 2,
  },
  physics: {
    default: "matter",
    matter: {
      debug: true,
      gravity: { y: 0 },
    },
  },
  plugins: {
    scene: [
      {
        plugin: PhaserMatterCollisionPlugin,
        key: "matterCollision",
        mapping: "matterCollision",
      },
    ],
  },
};
const game = new Phaser.Game(config);
export default game;
