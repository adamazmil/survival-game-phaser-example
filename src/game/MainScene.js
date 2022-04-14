import Phaser from "phaser";
//import logoImg from "../assets/logo.png";
import Player from "./Player.js";
import MapJSON from "../assets/map/map.json";
import Map from "../assets/map/RPG Nature Tileset.png";
export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    //this.load.image("logo", knight);
    Player.preload(this);
    this.load.image("tiles", Map);
    this.load.tilemapTiledJSON("map", MapJSON);
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("RPG Nature Tileset", "tiles", 32, 32);
    const layer1 = map.createLayer("Tile Layer 1", tileset);
    const layer2 = map.createLayer("Tile Layer 2", tileset);
    //const layer3 = map.createFromObjects("Object Layer 1");
    layer1.setCollisionByProperty({ collides: true });
    layer2.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(layer1);
    this.matter.world.convertTilemapLayer(layer2);
    this.player = new Player({
      scene: this,
      x: 50,
      y: 50,
      texture: "knight",
      frame: "eliteknight_idle_1",
    });
    const layer3 = map.createLayer("Above Player", tileset);
    layer3.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(layer3);
    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }
  update() {
    this.player.update();
  }
}
