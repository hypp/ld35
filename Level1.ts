
/// <reference path="typescript/phaser.d.ts" />

// python -m SimpleHTTPServer

namespace Mordor {

    export class Level1 extends Phaser.State {
        
        map: Phaser.Tilemap
        layer: Phaser.TilemapLayer
        player: Mordor.Player

        create() {
            let width = 800;
            let height = 600;

            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.stage.backgroundColor = "#000000";

            this.map = this.add.tilemap('level1');
            this.map.addTilesetImage('Floortiles');
            this.layer = this.map.createLayer('Ground');
            this.layer.resizeWorld();
            
            this.camera.y = this.world.height;
            
            this.player = new Mordor.Player(this.game, 300, this.world.height - 100);
            this.camera.follow(this.player);
         
        }

        update() {
//            this.camera.y -= 0.04;
        }

        render() {
            this.game.debug.cameraInfo(this.camera, 32, 32);
        }
    }
}
