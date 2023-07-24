import Phaser from "phaser";
import TextureKeys from "../consts/TextureKeys";
import SceneKeys from "../consts/SceneKeys";
import AnimationKeys from "../consts/AnimationKeys";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preloader);
  }

  preload() {
    // load background
    this.load.image(TextureKeys.Background, "house/bg_repeat_340x640.png");

    // load mouse hole
    this.load.image(TextureKeys.MouseHole, "house/object_mousehole.png");

    // load windows
    this.load.image(TextureKeys.Window1, "house/object_window1.png");
    this.load.image(TextureKeys.Window2, "house/object_window2.png");

    // load bookcases
    this.load.image(TextureKeys.Bookcase1, "house/object_bookcase1.png");
    this.load.image(TextureKeys.Bookcase2, "house/object_bookcase2.png");

    // load rocket mouse animation sprite sheet
    this.load.atlas(
      TextureKeys.RocketMouse,
      "characters/rocket-mouse.png",
      "characters/rocket-mouse.json",
    );
  }

  create() {
    // create run animation
    this.anims.create({
      key: AnimationKeys.RocketMouseRun,
      frames: this.anims.generateFrameNames(TextureKeys.RocketMouse, {
        start: 1,
        end: 4,
        prefix: "rocketmouse_run",
        zeroPad: 2,
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1,
    });

    // call game scene after every asset has been loaded
    this.scene.start(SceneKeys.Game);
  }
}
