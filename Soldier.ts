/// <reference path="typescript/phaser.d.ts" />

// python -m SimpleHTTPServer

namespace Mordor {

    export class Soldier extends Phaser.Sprite {

      prevFrame: number
      shoeprintGroup: Phaser.Group
      goalX: number
      goalY: number
      
      createShoeprint(x: number, y: number, name: string, frame: number) {
            let shoeprint = this.game.add.sprite(x, y, name, frame);
            shoeprint.anchor.setTo(0.5, 0.5);
            shoeprint.scale = new Phaser.Point(3.0, 3.0);
            shoeprint.rotation = this.rotation;
            shoeprint.moveDown();
            shoeprint.moveDown();
            this.game.physics.enable(shoeprint);
            this.shoeprintGroup.add(shoeprint);
            return shoeprint;
      }

      constructor(game: Phaser.Game, name: string, x: number, y: number, group: Phaser.Group) {
            super(game, x, y, name, 0);
            this.shoeprintGroup = group;
            
            this.anchor.setTo(0.5, 0.5);

            this.scale = new Phaser.Point(3.0, 3.0);
            this.animations.add('walk',[1,0,2,0],4,true);
            this.animations.play('walk');
            this.prevFrame = -1;
            
            game.add.existing(this);
            game.physics.enable(this);            
        }
        
        setGoal(x: number, y: number) {
            this.goalX = x;
            this.goalY = y;
            
            let dx = this.x - x;
            let dy = this.y - y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let time = (distance / 150) * 1000;
            
            
            let tween = this.game.add.tween(this).to({ x: x, y: y }, time, Phaser.Easing.Linear.None, true)            
        }
        
        inThisWorld() {
            if (this.x > this.game.world.width || this.x < 0 || this.y > this.game.world.height || this.y < 0) {
                return false;
            }
            
            return true;
        }

        update() {
            let dx = this.x - this.goalX;
            let dy = this.y - this.goalY;
            this.rotation =  -90 * (Math.PI / 180) + Math.atan2(dy, dx);
            
            if (this.inThisWorld()) {
                if (this.animations.frame !== this.prevFrame) {
                    this.prevFrame = this.animations.frame;
                    if (this.animations.frame === 1) {
                        let shoeprint = this.createShoeprint(this.x, this.y, 'shoeprints', 0);
                    // shoeprint.body.setSize(8,8,8,3);
                        
                    } else if (this.animations.frame === 2) {
                        let shoeprint = this.createShoeprint(this.x, this.y, 'shoeprints', 1);
                        //shoeprint.body.setSize(8,8,16,3);
                        
                    }
                }
            } else {
                let b = 42;
            } 
        }
    }
}