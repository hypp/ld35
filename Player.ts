/// <reference path="typescript/phaser.d.ts" />

// python -m SimpleHTTPServer

namespace Mordor {

    export class Player extends Phaser.Sprite {
      broom: Phaser.Sprite

      constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, "player", 0);
            this.anchor.setTo(0.5, 0.5);

            this.scale = new Phaser.Point(3.0, 3.0);
            this.animations.add('walk',[1,0,2,0],4,true);
            this.animations.add('broom',[1,0],8,true);

            this.broom = this.game.make.sprite(10,-4,'broom');
            this.broom.anchor.setTo(0.5, 1.0);
            this.broom.rotation = 15 * (Math.PI / 180);
            game.add.tween(this.broom).to({ rotation: -15 * (Math.PI / 180)  }, 2000, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
            this.addChild(this.broom);
            
            game.add.existing(this);
            game.physics.enable(this);
            this.body.collideWorldBounds = true;
        }

        update() {
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;

            if (!this.animations.currentAnim.isPlaying) {
                this.animations.frame = 0;
            }

            switch (this.animations.frame) {
                case 1:
                    this.broom.y = 0;
                    break;
                case 2:
                    this.broom.y = -8;
                    break;
                default:
                    this.broom.y = -4;
                    break;
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.animations.stop("walk");
                this.animations.play("broom");
                return;
            } else {
                this.animations.stop("broom");                
            }
            
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.velocity.x = -150;
                this.animations.play("walk");
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.body.velocity.x = 150;
                this.animations.play("walk");
            }
            
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {

                this.body.velocity.y = -150;
                this.animations.play("walk");
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {

                this.body.velocity.y = 150;
                this.animations.play("walk");
            }
            
            if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
                this.animations.stop("walk");
                this.animations.frame = 0;
            } else {
                this.rotation = 90 * (Math.PI / 180) + Math.atan2(this.body.velocity.y, this.body.velocity.x);
            }
        }
    }
}