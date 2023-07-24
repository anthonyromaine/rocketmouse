import Phaser from "phaser";
import TextureKeys from "../consts/TextureKeys";

export default class LaserObstacle extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    // create top end of laser
    const top = scene.add.image(0, 0, TextureKeys.LaserEnd).setOrigin(0.5, 0);

    // create middle of laser
    const middle = scene.add
      .image(0, top.y + top.displayHeight, TextureKeys.LaserMiddle)
      .setOrigin(0.5, 0);

    // set height of middle laser to 200px
    middle.setDisplaySize(middle.width, 200);

    // create bottom end of laser
    const bottom = scene.add
      .image(0, middle.y + middle.displayHeight, TextureKeys.LaserEnd)
      .setOrigin(0.5, 0)
      .setFlipY(true);

    // add all laser pieces to the Container
    this.add(top);
    this.add(middle);
    this.add(bottom);
  }
}
