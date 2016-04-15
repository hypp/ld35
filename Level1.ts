
/// <reference path="typescript/phaser.d.ts" />

// python -m SimpleHTTPServer

namespace Mordor {

    export class Level1 extends Phaser.State {

        create() {
            let width = 800;
            let height = 600;

            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.stage.backgroundColor = "#000000";

            //  Modify the world and camera bounds
            this.world.setBounds(0, 0, width, height);
        }

        update() {
        }

        render() {
            this.game.debug.cameraInfo(this.camera, 32, 32);
        }
    }
}
