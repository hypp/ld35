/// <reference path="typescript/phaser.d.ts" />

// python -m SimpleHTTPServer

namespace Mordor {

    export class MainMenu extends Phaser.State {

        group: Phaser.Group
        music: Phaser.Sound

        create() {            
        //    this.physics.startSystem(Phaser.Physics.ARCADE);
            this.stage.backgroundColor = "#336633";

            this.group = this.add.physicsGroup(Phaser.Physics.ARCADE);
            
            
            
            let y = 32;
            this.add.text(32, y, 'NATO SHAPE http://www.shape.nato.int/', { fontSize: '32px', fill: '#88aa77' });
            y += 36;
            this.add.text(32, y, 'Supreme Headquartes Allied Powers Europe', { fontSize: '32px', fill: '#88aa77' });
            y += 72;
            
            this.add.text(32,y, '- Welcome. I am General Error. Your new job starts today.', { fontSize: '16px', fill: '#88aa77' });
            y += 20;
            this.add.text(32,y, '- Every man and woman must do his or her part in this time of crisis.', { fontSize: '16px', fill: '#88aa77' });
            y += 20;
            this.add.text(32,y, '- We appreciate what you are doing for your country.', { fontSize: '16px', fill: '#88aa77' });
            y += 20;
            this.add.text(32,y, '- We use a three shift system. Time for your first shift at SHAPE.', { fontSize: '16px', fill: '#88aa77' });
            y += 20;            
            this.add.text(32,y, '- Your first shapeshift, as I like to call it!', { fontSize: '16px', fill: '#88aa77' });
            y += 44;
            this.add.text(128,y, 'Click to proceed.', { fontSize: '24px', fill: '#88aa77' });
            
            this.add.text(32,600-16, 'A game for Ludum Dare 35 by Mathias Olsson.', { fontSize: '8px', fill: '#88aa77' });

            this.input.onDown.addOnce(this.startGame, this);
            
            let x = this.world.width + 100;
            y = y + 144;
            let xGoal = 0 - 100;
            let yGoal = y;
            let generalError = new Mordor.Soldier(this.game, 'generalerror', x, y + this.rnd.between(-16,16), this.group, 'General Error');
            generalError.setGoal(xGoal, yGoal);
            x += 112;
            let majorFailure = new Mordor.Soldier(this.game, 'general2', x, y + this.rnd.between(-16,16), this.group, 'Major Failure');
            majorFailure.setGoal(xGoal, yGoal);
            x += 112;
            let corporalPunishment = new Mordor.Soldier(this.game, 'general1', x, y + this.rnd.between(-16,16), this.group, 'Corporal Punishment');
            corporalPunishment.setGoal(xGoal, yGoal);
            x += 112;
            let privateParts = new Mordor.Soldier(this.game, 'player', x, y + this.rnd.between(-16,16), this.group, 'Private Parts');
            privateParts.setGoal(xGoal, yGoal);
            x += 112;
            let privateDetective = new Mordor.Soldier(this.game, 'player', x, y + this.rnd.between(-16,16), this.group, 'Private Detective');
            privateDetective.setGoal(xGoal, yGoal);
            x += 112;
            let privateRoad = new Mordor.Soldier(this.game, 'player', x, y + this.rnd.between(-16,16), this.group, 'Private Road');
            privateRoad.setGoal(xGoal, yGoal);
            x += 112;
            
            // Setup a few random soldiers
            let diff = 60;
            let y1 = y - diff;
            let y2 = y + diff
            for (let i = 0; i < 20; i += 2) {
                let soldierBoy1 = new Mordor.Soldier(this.game, 'player', x, y1 + this.rnd.between(-16,16), this.group, 'Cannon Fodder');
                soldierBoy1.setGoal(xGoal, yGoal - diff);
                let soldierBoy2 = new Mordor.Soldier(this.game, 'player', x, y2 + this.rnd.between(-16,16), this.group, 'Cannon Fodder');
                soldierBoy2.setGoal(xGoal, yGoal + diff);
                x += 112;
            }
            
            this.music = this.add.audio('music');
            this.music.loop = true;
            this.music.play();            
        }
        
        update() {
            
        }

        startGame() {
            this.game.state.start("Level1", true, false);
        }

    }

}
