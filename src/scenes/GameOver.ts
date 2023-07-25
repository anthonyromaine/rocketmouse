import Phaser from "phaser";

import SceneKeys from "../consts/SceneKeys";

export default class GameOver extends Phaser.Scene {
  constructor() {
    super(SceneKeys.GameOver);
  }

  create() {
    const { width, height } = this.scale;

    const x = width * 0.5;
    const y = height * 0.5;

    this.add
      .text(x, y, "Tap Screen or Press SPACE to Play Again", {
        fontSize: "32px",
        color: "#FFFFFF",
        backgroundColor: "#000000",
        shadow: { fill: true, blur: 0, offsetY: 0 },
        padding: { left: 15, right: 15, top: 10, bottom: 10 },
      })
      .setOrigin(0.5);

    // listen for the Space bar being pressed
    this.input.keyboard?.once("keydown-SPACE", () => {
      // stop for the GameOver Scene
      this.scene.stop(SceneKeys.GameOver);

      // stop and restart the Game Scene
      this.scene.stop(SceneKeys.Game);
      this.scene.start(SceneKeys.Game);
    });

    this.input.once("pointerdown", () => {
      // stop for the GameOver Scene
      this.scene.stop(SceneKeys.GameOver);

      // stop and restart the Game Scene
      this.scene.stop(SceneKeys.Game);
      this.scene.start(SceneKeys.Game);
    });
  }
}
