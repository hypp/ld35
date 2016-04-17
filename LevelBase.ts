/// <reference path="typescript/phaser.d.ts" />

// python -m SimpleHTTPServer

namespace Mordor {

    export class LevelBase extends Phaser.State {

        map: Phaser.Tilemap
        layer: Phaser.TilemapLayer
        player: Mordor.Player
        group: Phaser.Group
        scoreText: Phaser.Text
        isLevelDone: boolean
        oldRank: number
        doneSound: Phaser.Sound
        stainGroup: Phaser.Group
        myGame: Mordor.Game
        nextLevel: string

        tutorial() {
            let y = this.world.height - 100;
            let x = 200;
            let tutFast = this.add.text(x, -40, 'General Error says: Move UP through hangar 18 as FAST as possible', { fontSize: '16px', fill: '#eeeeee' });
            let fastTween = this.add.tween(tutFast).to( { y: y }, 2400, Phaser.Easing.Bounce.Out);
            y -= 250;
            let tutArrow = this.add.text(x, -40, 'General Error says: Press arrow keys to move', { fontSize: '16px', fill: '#eeeeee' });
            let arrowTween = this.add.tween(tutArrow).to( { y: y }, 2400, Phaser.Easing.Bounce.Out);
            y -= 250;
            let tutGoal1 = this.add.text(x, -40, 'General Error says: Keep on moving, soldier! Faster!', { fontSize: '16px', fill: '#eeeeee' });
            let goal1Tween = this.add.tween(tutGoal1).to( { y: y }, 2400, Phaser.Easing.Bounce.Out);
            y -= 250;
            let tutBack = this.add.text(x, -40, 'General Error says: You cannot move back', { fontSize: '16px', fill: '#eeeeee' });
            let backTween = this.add.tween(tutBack).to( { y: y }, 2400, Phaser.Easing.Bounce.Out);
            y -= 250;
            let tutBroom = this.add.text(x, -40, 'General Error says: Stand still and hold spacebar to use your weapaon', { fontSize: '16px', fill: '#eeeeee' });
            let broomTween = this.add.tween(tutBroom).to( { y: y }, 2400, Phaser.Easing.Bounce.Out);
            y -= 250;
            let tutClean = this.add.text(x, -40, 'General Error says: Clean up after the other soldiers', { fontSize: '16px', fill: '#eeeeee' });
            let cleanTween = this.add.tween(tutClean).to( { y: y }, 2400, Phaser.Easing.Bounce.Out);
            y -= 250/2;
            let tutRank = this.add.text(x, -40, 'General Error says: The better you clean, the higher your rank', { fontSize: '16px', fill: '#eeeeee' });
            let rankTween = this.add.tween(tutRank).to( { y: y }, 2400, Phaser.Easing.Bounce.Out);
            y -= 250/2;
            let tutWeapon = this.add.text(x, -40, 'General Error says: No, you won\'t get a proper weapon!', { fontSize: '16px', fill: '#eeeeee' });
            let weapeonTween = this.add.tween(tutWeapon).to( { y: y }, 2400, Phaser.Easing.Bounce.Out);
            y -= 250;
            let tutGoal = this.add.text(x, -40, 'General Error says: Keep on moving, soldier! Faster!', { fontSize: '16px', fill: '#eeeeee' });
            let goalTween = this.add.tween(tutGoal).to( { y: y }, 2400, Phaser.Easing.Bounce.Out);
            y -= 250;
            let tutMissed = this.add.text(x, -40, 'General Error says: I think you missed a spot', { fontSize: '16px', fill: '#eeeeee' });
            let missedTween = this.add.tween(tutMissed).to( { y: y }, 2400, Phaser.Easing.Bounce.Out);
            y -= 250;
            
            fastTween.chain(arrowTween, goal1Tween, backTween, broomTween, cleanTween, rankTween, weapeonTween, goalTween, missedTween);
            fastTween.start();            
        }
        
        setupLevelPart1(layerName: string, nextLevel: string, stainName: string) {
            this.myGame = <Mordor.Game>this.game;
            this.nextLevel = nextLevel;
            
            let width = 800;
            let height = 600;
            
            this.isLevelDone = false;

            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.stage.backgroundColor = "#000000";

            this.map = this.add.tilemap('level1');
            this.map.addTilesetImage('Floortiles');
            this.layer = this.map.createLayer(layerName);
            this.layer.resizeWorld();
            
            this.camera.y = this.world.height;

            this.stainGroup = this.add.physicsGroup(Phaser.Physics.ARCADE);

            for (let i = 0; i < 15; ++i) {
                let x = this.rnd.between(0,this.world.width);
                let y = this.rnd.between(0,this.world.height);
                let angle = this.rnd.between(0, 360) * Math.PI / 180;
                let stain = this.add.sprite(x, y, stainName, 0, this.stainGroup);
                stain.anchor.setTo(0.5, 0.5);
                stain.rotation = angle;
                this.physics.enable(stain);
            }

            this.group = this.add.physicsGroup(Phaser.Physics.ARCADE);
            
            if (this.myGame.score === 0) {
                this.tutorial();            
            }
            
            this.oldRank = this.myGame.rankFromScore(this.myGame.score);
            let rank = this.myGame.rankFromScore(this.myGame.score);
            
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
        }
        
        setupLevelPart2(levelName: string) {
            let width = 800;
            let height = 600;
            
            this.scoreText = this.add.text(200, 500, 'score: 0', { fontSize: '32px', fill: '#000' });
            this.scoreText.text = 'Score: ' + this.myGame.score;                                    
            this.scoreText.fixedToCamera = true;
            this.scoreText.cameraOffset.setTo(50, height - 50);
            
            let introText = this.add.text(width / 2, this.world.height - height / 2, levelName, { fontSize: '32px', fill: '#eeeeee' });
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
            this.physics.arcade.overlap(this.player.broom, this.group, this.collisionHandler, this.processHandler, this);
            this.physics.arcade.overlap(this.player, this.group, this.collisionHandler, this.processHandler, this);
            this.physics.arcade.overlap(this.player.broom, this.stainGroup, this.collisionHandler, this.processHandler, this);
            this.physics.arcade.overlap(this.player, this.stainGroup, this.collisionHandler, this.processHandler, this);
            
            if (this.player.y < 16*5-8 && this.isLevelDone === false) {
                // Level complete
                this.isLevelDone = true;
                this.player.stop();            
                
                let width = 800;
                let height = 600;

                let outroText = this.add.text(width / 2, height / 2 - 64, 'Shift completed', { fontSize: '32px', fill: '#eeeeee' });
                outroText.anchor = new Phaser.Point(0.5, 0.5);
                outroText.alpha = 0.0;
                let tweenIn2 = this.game.add.tween(outroText).to({ alpha: 1.0 }, 2500, Phaser.Easing.Linear.None, false, 3000);            
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
                    let tweenIn3 = this.game.add.tween(rankText).to({ alpha: 1.0 }, 1500, Phaser.Easing.Linear.None, false, 2000);            
                    let tweenOut3 = this.game.add.tween(rankText).to({ alpha: 0.0 }, 1500, Phaser.Easing.Linear.None);            
                    tweenIn3.chain(tweenOut3);
                    tweenIn3.start();
                    
                }
            }
        }
        
        levelDone() {
            this.game.state.start(this.nextLevel, true, false);
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
                    this.myGame.score += 1;
                } else {
                    shoeprint.kill();
                    this.myGame.score += 5;
                }
                this.scoreText.text = 'Score: ' + this.myGame.score;
            }
        }
                
    }
    
}
 