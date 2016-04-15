/// <reference path="typescript/phaser.d.ts" />

// python -m SimpleHTTPServer

namespace Mordor {

    export class MainMenu extends Phaser.State {

        background: Phaser.Sprite;
        logo: Phaser.Sprite;

        create() {
            this.input.onDown.addOnce(this.startGame, this);
        }

        startGame() {
            this.game.state.start("Level1", true, false);
        }

    }

}
