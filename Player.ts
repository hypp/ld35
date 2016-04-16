/// <reference path="typescript/phaser.d.ts" />

// python -m SimpleHTTPServer

namespace Mordor {

    export class Player extends Phaser.Sprite {
      constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, "player", 0);
            this.anchor.setTo(0.5, 0.5);

            this.scale = new Phaser.Point(3.0, 3.0);
            this.animations.add('walk',[1,0,2,0],4,true);

            game.add.existing(this);

            game.physics.enable(this);
            this.body.collideWorldBounds = true;
        }

        update() {
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.velocity.x = -150;
                this.animations.play("walk");
//                this.rotation = -90 * (Math.PI / 180);
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.body.velocity.x = 150;
                this.animations.play("walk");
//                this.rotation = 90 * (Math.PI / 180);
            }
            
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {

                this.body.velocity.y = -150;
                this.animations.play("walk");
//                this.rotation = 0 * (Math.PI / 180);
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {

                this.body.velocity.y = 150;
                this.animations.play("walk");
//                this.rotation = 180 * (Math.PI / 180);
            }
            
            if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
                this.animations.frame = 0;
            } else {
                this.rotation = 90 * (Math.PI / 180) + Math.atan2(this.body.velocity.y, this.body.velocity.x);
            }

        }
        
    }
    
}