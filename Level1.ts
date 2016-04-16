
/// <reference path="typescript/phaser.d.ts" />

// python -m SimpleHTTPServer

namespace Mordor {

    export class Level1 extends Phaser.State {
        
        map: Phaser.Tilemap
        layer: Phaser.TilemapLayer
        player: Mordor.Player
        group: Phaser.Group
        score: number
        scoreText: Phaser.Text

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

            this.group = this.add.physicsGroup(Phaser.Physics.ARCADE);
            
            this.player = new Mordor.Player(this.game, 300, this.world.height - 100);
            this.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);
         
            let privateParts = new Mordor.Soldier(this.game, -100, this.world.height - 200, this.group);
            privateParts.setGoal(this.world.width+100, this.world.height - 200);
            let privateDetective = new Mordor.Soldier(this.game, this.world.width / 2, this.world.height + 100, this.group);
            privateDetective.setGoal(this.world.width / 2, 0 - 100);
            let privateEye = new Mordor.Soldier(this.game, this.world.width + 100, this.world.height / 2, this.group);
            privateEye.setGoal(0 - 100, this.world.height / 2 - 100);
                        
            this.score = 0;
            this.scoreText = this.add.text(200, 500, 'score: 0', { fontSize: '32px', fill: '#000' });
            this.scoreText.fixedToCamera = true;
            this.scoreText.cameraOffset.setTo(50, height - 50);
            
            let introText = this.add.text(width / 2, this.world.height - height / 2, 'Level 1 - The Hangar', { fontSize: '32px', fill: '#eeeeee' });
            introText.anchor = new Phaser.Point(0.5, 0.5);
            introText.alpha = 0.0;
            let tweenIn = this.game.add.tween(introText).to({ alpha: 1.0 }, 1500, Phaser.Easing.Linear.None);            
            let tweenOut = this.game.add.tween(introText).to({ alpha: 0.0 }, 1500, Phaser.Easing.Linear.None);            
            tweenIn.chain(tweenOut);
            tweenIn.start();
        }

        update() {
            if (this.physics.arcade.overlap(this.player.broom, this.group, this.collisionHandler, this.processHandler, this))
            {
//                console.log('boom');
            }        
            if (this.physics.arcade.overlap(this.player, this.group, this.collisionHandler, this.processHandler, this))
            {
//                console.log('boom');
            }        
        }

        render() {
/*            this.game.debug.cameraInfo(this.camera, 32, 32);
            this.game.debug.body(this.player.broom);
            this.game.debug.body(this.player);
            this.group.forEach((item) => {this.game.debug.body(item)}, this);
*/
        }
        
        processHandler (broom, shoeprint) {
            if (!this.player.isCleaning) {
                return false;
            }
            
            let dx = this.player.x + broom.x - shoeprint.x;
            let dy = this.player.y + broom.y - shoeprint.y;
            let distance = dx * dx + dy * dy;
            if (distance > 50 * 50) {
                return false;
            } else {
                return true;
            }
        }

        collisionHandler (broom, shoeprint) {
            if (this.player.isCleaning) {
                if (shoeprint.alpha > 0.1) {
                    shoeprint.alpha -= 0.1;
                } else {
                    shoeprint.kill();
                    this.score += 10;
                    this.scoreText.text = 'Score: ' + this.score;
                }
            }
        }
        
        soldierOut(soldier) {

            //  Move the alien to the top of the screen again
           // alien.reset(alien.x, -32);

            //  And give it a new random velocity
          //  alien.body.velocity.y = 50 + Math.random() * 200;
            let b = 42;
        }        
    }
}
