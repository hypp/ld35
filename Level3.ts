
/// <reference path="typescript/phaser.d.ts" />

// python -m SimpleHTTPServer

namespace Mordor {

    export class Level3 extends Mordor.LevelBase {
        
        create() {
            this.setupLevelPart1('Jungle','Level1','bloodstain');
            
            let privateParts = new Mordor.Soldier(this.game, 'player', -100, this.world.height - 200, this.group);
            privateParts.setGoal(this.world.width+100, this.world.height);
            let privateDetective = new Mordor.Soldier(this.game, 'player', this.world.width + 100, this.world.height + 100, this.group);
            privateDetective.setGoal(this.world.width / 2, -100);
            let privateEye = new Mordor.Soldier(this.game, 'player', this.world.width + 100, this.world.height / 4, this.group);
            privateEye.setGoal(0 - 100, this.world.height / 2 - 100);
            
            let majorFailure = new Mordor.Soldier(this.game, 'general1', 100, -100, this.group);
            majorFailure.setGoal(350, this.world.height + 100);
            let corporalPunishment = new Mordor.Soldier(this.game, 'general2', this.world.width + 100, this.world.height - 200, this.group);
            corporalPunishment.setGoal(-100, this.world.height);
            let generalError = new Mordor.Soldier(this.game, 'generalerror', -100, 800, this.group);
            generalError.setGoal(this.world.width + 100, 100);

            this.setupLevelPart2('- The Jungle Battle Shift -');                                            
        }
    }
}
