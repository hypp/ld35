
/// <reference path="typescript/phaser.d.ts" />

// python -m SimpleHTTPServer

namespace Mordor {

    export class Level2 extends Mordor.LevelBase {
        
        create() {
            this.setupLevelPart1('Outdoor','Level3','waterstain');
                     
            let privateParts = new Mordor.Soldier(this.game, 'player', this.world.width, this.world.height + 100, this.group);
            privateParts.setGoal(0, -100);
            let privateDetective = new Mordor.Soldier(this.game, 'player', 0, this.world.height + 100, this.group);
            privateDetective.setGoal(this.world.width, -100);
            let privateEye = new Mordor.Soldier(this.game, 'player', this.world.width / 2, this.world.height + 100, this.group);
            privateEye.setGoal(this.world.width / 2 - 64, -100);
            
            let majorFailure = new Mordor.Soldier(this.game, 'general1', -100, (this.world.height / 3) * 2, this.group);
            majorFailure.setGoal(this.world.width + 100, (this.world.height / 3) * 1);
            let corporalPunishment = new Mordor.Soldier(this.game, 'general2', this.world.width + 100, (this.world.height / 3) * 1, this.group);
            corporalPunishment.setGoal(-100, (this.world.height / 3) * 2);
            let generalError = new Mordor.Soldier(this.game, 'generalerror', this.world.width + 100, this.world.height / 2 - 100, this.group);
            generalError.setGoal(-100, this.world.height / 2 + 100);
                    
            this.setupLevelPart2('- The Excersice Yard Shift -');        
                    
        }
    }
}
