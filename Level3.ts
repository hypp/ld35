
/// <reference path="typescript/phaser.d.ts" />

// python -m SimpleHTTPServer

namespace Mordor {

    export class Level3 extends Mordor.LevelBase {
        
        create() {
            this.setupLevelPart1('Jungle','Level1','bloodstain');
            
            let privateParts = new Mordor.Soldier(this.game, 'player', -100, this.world.height - 200, this.group);
            privateParts.setGoal(this.world.width+100, this.world.height - 200);
            let privateDetective = new Mordor.Soldier(this.game, 'player', this.world.width / 2, this.world.height + 100, this.group);
            privateDetective.setGoal(this.world.width / 2, 0 - 100);
            let privateEye = new Mordor.Soldier(this.game, 'player', this.world.width + 100, this.world.height / 2, this.group);
            privateEye.setGoal(0 - 100, this.world.height / 2 - 100);
            
            let majorFailure = new Mordor.Soldier(this.game, 'general1', 100, -100, this.group);
            majorFailure.setGoal(150, this.world.height + 100);
            let corporalPunishment = new Mordor.Soldier(this.game, 'general2', this.world.width + 100, this.world.height - 200, this.group);
            corporalPunishment.setGoal(100, -100);
            let generalError = new Mordor.Soldier(this.game, 'generalerror', this.world.width + 100, 800, this.group);
            generalError.setGoal(0 - 100, 1000);

            this.setupLevelPart2('- The Jungle Battle Shift -');                                            
        }
    }
}
