import Phaser from "@adamazmil/phaser";
//import logoImg from "../assets/logo.png";
import Player from "./Player.js";
//import MapJSON from "../assets/map/map.json";
//import Map from "../assets/map/RPG Nature Tileset.png";
import MapJSON from "../assets/map/isomap.json";
import Map from "../assets/map/text.png";
import Camel from "./Camel.js";
import findPath from "./findPath.js";
export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    //this.load.image("logo", knight);
    Player.preload(this);
    Camel.preload(this);
    this.load.image("tiles", Map);
    this.load.tilemapTiledJSON("map", MapJSON);
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("text", "tiles");
    const layer1 = map.createLayer("Tile Layer 1", tileset);
    const layer2 = map.createLayer("Tile Layer 2", tileset);
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
    this.cameras.main.startFollow(this.player);
    const layer3 = map.createLayer("Above Player", tileset);
    layer3.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(layer3);
    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      pet: Phaser.Input.Keyboard.KeyCodes.E,
    });
    this.input.on(Phaser.Input.Events.POINTER_UP, (pointer) => {
      const { worldX, worldY } = pointer;

      const startVec = layer1.worldToTileXY(this.player.x, this.player.y);
      const targetVec = layer1.worldToTileXY(worldX, worldY);

      const path = findPath(startVec, targetVec, layer1, layer3);
      this.player.moveAlong(path);
    });
    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.input.off(Phaser.Input.Events.POINTER_UP);
    });
  }
  update() {
    this.player.update();
  }
}
