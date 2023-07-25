import Phaser from "phaser";
import TextureKeys from "../consts/TextureKeys";
import AnimationKeys from "../consts/AnimationKeys";
import SceneKeys from "../consts/SceneKeys";

enum MouseState {
  Running,
  Killed,
  Dead,
}

export default class RocketMouse extends Phaser.GameObjects.Container {
  private flames: Phaser.GameObjects.Sprite;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private mouse: Phaser.GameObjects.Sprite;
  private mouseState = MouseState.Running;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    // create rocket mouse sprite
    this.mouse = scene.add
      .sprite(0, 0, TextureKeys.RocketMouse)
      .setOrigin(0.5, 1);

    this.flames = scene.add.sprite(-63, -15, TextureKeys.RocketMouse);

    this.createAnimations();

    this.mouse.play(AnimationKeys.RocketMouseRun);
    this.flames.play(AnimationKeys.RocketFlamesOn);

    this.enableJetpack(false);

    // add as child of Container
    this.add(this.flames);
    this.add(this.mouse);

    // add a physics body
    scene.physics.add.existing(this);

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(this.mouse.width * 0.5, this.mouse.height * 0.7);
    body.setOffset(this.mouse.width * -0.3, -this.mouse.height + 15);

    this.cursors = scene.input.keyboard!.createCursorKeys();
  }

  preUpdate() {
    const body = this.body as Phaser.Physics.Arcade.Body;
    switch (this.mouseState) {
      case MouseState.Running: {
        if (
          this.cursors.space.isDown ||
          this.scene.input.activePointer.isDown
        ) {
          body.setAccelerationY(-600);
          this.enableJetpack(true);

          // play flying animation
          this.mouse.play(AnimationKeys.RocketMouseFly, true);
        } else {
          body.setAccelerationY(0);
          this.enableJetpack(false);
        }

        // check if touching the ground
        if (body.blocked.down) {
          this.mouse.play(AnimationKeys.RocketMouseRun, true);
        } else if (body.velocity.y > 0) {
          this.mouse.play(AnimationKeys.RocketMouseFall, true);
        }

        break;
      }

      case MouseState.Killed: {
        body.velocity.x *= 0.99;

        // once less than 5 we can say stop
        if (body.velocity.x <= 5) {
          this.mouseState = MouseState.Dead;
        }
        break;
      }

      case MouseState.Dead: {
        // make a complete stop
        body.setVelocity(0, 0);
        this.scene.scene.run(SceneKeys.GameOver);
        break;
      }
    }
  }

  enableJetpack(enabled: boolean) {
    this.flames.setVisible(enabled);
  }

  kill() {
    // don't do anything if not in RUNNING state
    if (this.mouseState !== MouseState.Running) {
      return;
    }

    // set state to KILLED
    this.mouseState = MouseState.Killed;
    this.mouse.play(AnimationKeys.RocketMouseDead);

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setAccelerationY(0);
    body.setVelocity(1000, 0);
    this.enableJetpack(false);
  }

  private createAnimations() {
    // create run animation
    this.mouse.anims.create({
      key: AnimationKeys.RocketMouseRun,
      frames: this.mouse.anims.generateFrameNames(TextureKeys.RocketMouse, {
        start: 1,
        end: 4,
        prefix: "rocketmouse_run",
        zeroPad: 2,
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1,
    });

    // create falling animation
    this.mouse.anims.create({
      key: AnimationKeys.RocketMouseFall,
      frames: [
        {
          key: TextureKeys.RocketMouse,
          frame: "rocketmouse_fall01.png",
        },
      ],
    });

    // create flying animation
    this.mouse.anims.create({
      key: AnimationKeys.RocketMouseFly,
      frames: [
        {
          key: TextureKeys.RocketMouse,
          frame: "rocketmouse_fly01.png",
        },
      ],
    });

    // create the flames animation
    this.mouse.anims.create({
      key: AnimationKeys.RocketFlamesOn,
      frames: this.mouse.anims.generateFrameNames(TextureKeys.RocketMouse, {
        start: 1,
        end: 2,
        prefix: "flame",
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.mouse.anims.create({
      key: AnimationKeys.RocketMouseDead,
      frames: this.mouse.anims.generateFrameNames(TextureKeys.RocketMouse, {
        start: 1,
        end: 2,
        prefix: "rocketmouse_dead",
        zeroPad: 2,
        suffix: ".png",
      }),
      frameRate: 10,
    });
  }
}
