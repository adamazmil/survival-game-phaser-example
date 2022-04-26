import Phaser from "@adamazmil/phaser";
import IsoScene from "./IsoScene.js";
import AnimatedTiles from "phaser-animated-tiles-phaser3.5";
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
  scene: [IsoScene],
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
};
const game = new Phaser.Game(config);
export default game;
