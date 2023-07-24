import Phaser from "phaser";

import Preloader from "./scenes/Preloader";
import Game from "./scenes/Game";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "app",
  width: 800,
  height: 640,
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
  },
  autoCenter: Phaser.Scale.Center.CENTER_BOTH,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: true,
    },
  },
  scene: [Preloader, Game],
};

export default new Phaser.Game(config);
