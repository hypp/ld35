/// <reference path="typescript/phaser.d.ts" />

// python -m SimpleHTTPServer

namespace Mordor {

    export class Player extends Phaser.Sprite {
      broom: Phaser.Sprite
      isCleaning: boolean
      displayName: Phaser.Text
      isStopped: boolean
      sopa1: Phaser.Sound
      sopa2: Phaser.Sound

      constructor(game: Phaser.Game, x: number, y: number, name: string, displayName?: string) {
            super(game, x, y, name, 0);
            this.anchor.setTo(0.5, 0.5);

            this.scale = new Phaser.Point(3.0, 3.0);
            this.animations.add('walk',[1,0,2,0],4,true);
            this.animations.add('broom',[1,0],8,true);

            this.broom = this.game.make.sprite(10,-4,'broom');
            this.broom.anchor.setTo(0.5, 1.0);
       //     this.broom.scale = new Phaser.Point(3.0, 3.0);
            this.broom.rotation = 15 * (Math.PI / 180);
            game.add.tween(this.broom).to({ rotation: -15 * (Math.PI / 180)  }, 2000, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
            this.addChild(this.broom);
            game.physics.enable(this.broom);
      //      this.broom.body.setSize(8,16,0,0);
            this.isCleaning = false;
            
            game.add.existing(this);
            game.physics.enable(this);
            this.body.collideWorldBounds = true;
            this.body.setSize(32,32,0,-16);
            
            if (displayName !== null) {
                this.displayName = game.add.text(x, y, displayName, { fontSize: '12px', fill: '#aacc99' });
            }          
            this.sopa1 = this.game.add.audio('sopa1');
            this.sopa1.volume = 0.05;
            this.sopa2 = this.game.add.audio('sopa2');
            this.sopa2.volume = 0.05;
            
            this.isStopped = false;  
        }

        update() {
            if (this.displayName !== null) {
                this.displayName.x = this.x - this.displayName.width / 2;
                this.displayName.y = this.y + 48;
            }
            
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            
            this.game.world.setBounds(0,0,800,this.game.camera.y+600);

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
            
            if (this.isStopped !== true) {
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                    this.animations.stop("walk");
                    this.animations.play("broom");
                    this.isCleaning = true;
                    if (this.sopa1.isPlaying === false && this.sopa2.isPlaying === false) {
                        if (this.game.rnd.between(0,1) === 0) {
                            this.sopa1.play();
                        } else {
                            this.sopa2.play();
                        }
                    }
                    return;
                } else {
                    this.animations.stop("broom");
                    this.isCleaning = false;
                }
                
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                    this.body.velocity.x = -150;
                }
                else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                    this.body.velocity.x = 150;
                }
                            
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {

                    this.body.velocity.y = -150;
                    this.animations.play("walk");
                }
                else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                    if (this.body.y < this.game.camera.bounds.bottom) {
                        this.body.velocity.y = 150;
                        this.animations.play("walk");                    
                    }

                }
            }
            
            if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
                this.animations.stop("walk");
                this.animations.frame = 0;
            } else {
                this.animations.play("walk");
                this.rotation = 90 * (Math.PI / 180) + Math.atan2(this.body.velocity.y, this.body.velocity.x);
            }
        }
        
        stop() {
            this.isStopped = true;
        }
    }
}
