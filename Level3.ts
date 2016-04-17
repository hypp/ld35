
/// <reference path="typescript/phaser.d.ts" />

// python -m SimpleHTTPServer

namespace Mordor {

    export class Level3 extends Phaser.State {
        
        map: Phaser.Tilemap
        layer: Phaser.TilemapLayer
        player: Mordor.Player
        group: Phaser.Group
        scoreText: Phaser.Text
        isLevelDone: boolean
        oldRank: number
        doneSound: Phaser.Sound

        create() {
            let width = 800;
            let height = 600;
            
            this.isLevelDone = false;

            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.stage.backgroundColor = "#000000";

            this.map = this.add.tilemap('level1');
            this.map.addTilesetImage('Floortiles');
            this.layer = this.map.createLayer('Jungle');
            this.layer.resizeWorld();
            
            this.camera.y = this.world.height;

            this.group = this.add.physicsGroup(Phaser.Physics.ARCADE);
            
            
            let tmp = <Mordor.Game>this.game;      
            this.oldRank = tmp.rankFromScore(tmp.score);
            let rank = tmp.rankFromScore(tmp.score);
            
            switch (rank) {
                case 1:
                    this.player = new Mordor.Player(this.game, 300, this.world.height - 100, 'general1', ' Corporal You');
                    break;
                case 2:
                    this.player = new Mordor.Player(this.game, 300, this.world.height - 100, 'general2', ' Major You');
                    break;
                case 3:     
                    this.player = new Mordor.Player(this.game, 300, this.world.height - 100, 'generalerror', ' General You');
                    break;
                case 0:
                default:                
                    this.player = new Mordor.Player(this.game, 300, this.world.height - 100, 'player', 'You');
                    break;
                
            }
            
            this.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);
         
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
                                    
            this.scoreText = this.add.text(200, 500, 'score: 0', { fontSize: '32px', fill: '#000' });
            this.scoreText.text = 'Score: ' + tmp.score;                                    
            this.scoreText.fixedToCamera = true;
            this.scoreText.cameraOffset.setTo(50, height - 50);
            
            let introText = this.add.text(width / 2, this.world.height - height / 2, '- The Jungle Battle -', { fontSize: '32px', fill: '#eeeeee' });
            introText.anchor = new Phaser.Point(0.5, 0.5);
            introText.alpha = 0.0;
            let tweenIn = this.game.add.tween(introText).to({ alpha: 1.0 }, 1500, Phaser.Easing.Linear.None);            
            let tweenOut = this.game.add.tween(introText).to({ alpha: 0.0 }, 1500, Phaser.Easing.Linear.None);            
            tweenIn.chain(tweenOut);
            tweenIn.start();
            
            this.doneSound = this.game.add.audio('levelcomplete');
            this.doneSound.volume = 1.0;           
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
            
            if (this.player.y < 15*6 && this.isLevelDone === false) {
                // Level complete
                this.isLevelDone = true;
                this.player.stop();            
                
                let width = 800;
                let height = 600;

                let outroText = this.add.text(width / 2, height / 2 - 64, 'Level completed', { fontSize: '32px', fill: '#eeeeee' });
                outroText.anchor = new Phaser.Point(0.5, 0.5);
                outroText.alpha = 0.0;
                let tweenIn2 = this.game.add.tween(outroText).to({ alpha: 1.0 }, 2500, Phaser.Easing.Linear.None);            
                let tweenOut2 = this.game.add.tween(outroText).to({ alpha: 0.0 }, 2500, Phaser.Easing.Linear.None);            
                tweenIn2.chain(tweenOut2);
                tweenIn2.start();
                tweenOut2.onComplete.add(this.levelDone, this);
                this.doneSound.play();
                
                let tmp = <Mordor.Game>this.game;
                if (this.oldRank !== tmp.rankFromScore(tmp.score)) {
                    let rankText = this.add.text(width / 2, height / 3 - 64, 'General Error says: You shift shape to a new rank. Well done!', { fontSize: '24px', fill: '#eeeeee' });
                    rankText.anchor = new Phaser.Point(0.5, 0.5);
                    rankText.alpha = 0.0;
                    let tweenIn3 = this.game.add.tween(rankText).to({ alpha: 1.0 }, 1500, Phaser.Easing.Linear.None);            
                    let tweenOut3 = this.game.add.tween(rankText).to({ alpha: 0.0 }, 1500, Phaser.Easing.Linear.None);            
                    tweenIn3.chain(tweenOut3);
                    tweenIn3.start();
                    
                }
            }
        }
        
        levelDone() {
            this.game.state.start("Level1", true, false);
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
                    let tmp = <Mordor.Game>this.game;
                    tmp.score += 10;
                    this.scoreText.text = 'Score: ' + tmp.score;
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
