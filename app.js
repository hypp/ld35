var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="typescript/phaser.d.ts" />
// python -m SimpleHTTPServer
var Mordor;
(function (Mordor) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 800, 600, Phaser.AUTO, "content", null);
            this.score = 0;
            this.state.add("Boot", Mordor.Boot, false);
            this.state.add("Preloader", Mordor.Preloader, false);
            this.state.add("MainMenu", Mordor.MainMenu, false);
            this.state.add("Level1", Mordor.Level1, false);
            this.state.add("Level2", Mordor.Level2, false);
            this.state.add("Level3", Mordor.Level3, false);
            this.state.start("Boot");
        }
        Game.prototype.rankFromScore = function (score) {
            var rank = 0;
            if (score < 500) {
                // Private
                rank = 0;
            }
            else if (score < 1000) {
                // general1
                rank = 1;
            }
            else if (score < 1500) {
                // general2
                rank = 2;
            }
            else {
                // generalerror
                rank = 3;
            }
            return rank;
        };
        return Game;
    }(Phaser.Game));
    Mordor.Game = Game;
})(Mordor || (Mordor = {}));
/// <reference path="typescript/phaser.d.ts" />
// python -m SimpleHTTPServer
var Mordor;
(function (Mordor) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image("preloadBar", "assets/loader.png");
        };
        Boot.prototype.create = function () {
            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;
            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;
            if (this.game.device.desktop) {
                //  If you have any desktop specific settings, they can go in here
                this.game.scale.pageAlignHorizontally = true;
            }
            else {
                //  Same goes for mobile settings.
                //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.game.scale.minWidth = 480;
                this.game.scale.minHeight = 260;
                this.game.scale.maxWidth = 1024;
                this.game.scale.maxHeight = 768;
                this.game.scale.forceLandscape = true;
                this.game.scale.pageAlignHorizontally = true;
            }
            this.game.state.start("Preloader", true, false);
        };
        return Boot;
    }(Phaser.State));
    Mordor.Boot = Boot;
})(Mordor || (Mordor = {}));
/// <reference path="typescript/phaser.d.ts" />
// python -m SimpleHTTPServer
var Mordor;
(function (Mordor) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(200, 250, "preloadBar");
            this.load.setPreloadSprite(this.preloadBar);
            //  Load our actual games assets
            this.load.tilemap('level1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
            // Next we load the tileset. This is just an image, loaded in via the normal way we load images:
            this.load.image('Floortiles', 'assets/floortiles.png');
            // 
            this.load.spritesheet('player', 'assets/player.png', 32, 16, 3);
            this.load.spritesheet('general1', 'assets/general.png', 32, 16, 3);
            this.load.spritesheet('general2', 'assets/general2.png', 32, 16, 3);
            this.load.spritesheet('generalerror', 'assets/general3.png', 32, 16, 3);
            this.load.spritesheet('player', 'assets/player.png', 32, 16, 3);
            this.load.image('broom', 'assets/broom.png');
            this.load.spritesheet('shoeprints', 'assets/shoeprints.png', 32, 16, 2);
            this.load.audio('music', 'assets/music.wav', true);
            this.load.audio('sopa1', 'assets/sopa1.wav', true);
            this.load.audio('sopa2', 'assets/sopa2.wav', true);
            this.load.audio('levelcomplete', 'assets/levelcomplete.wav', true);
        };
        Preloader.prototype.create = function () {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        };
        Preloader.prototype.startMainMenu = function () {
            this.game.state.start("MainMenu", true, false);
        };
        return Preloader;
    }(Phaser.State));
    Mordor.Preloader = Preloader;
})(Mordor || (Mordor = {}));
/// <reference path="typescript/phaser.d.ts" />
// python -m SimpleHTTPServer
var Mordor;
(function (Mordor) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            //    this.physics.startSystem(Phaser.Physics.ARCADE);
            this.stage.backgroundColor = "#336633";
            this.group = this.add.physicsGroup(Phaser.Physics.ARCADE);
            var y = 32;
            this.add.text(32, y, 'NATO SHAPE http://www.shape.nato.int/', { fontSize: '32px', fill: '#88aa77' });
            y += 36;
            this.add.text(32, y, 'Supreme Headquartes Allied Powers Europe', { fontSize: '32px', fill: '#88aa77' });
            y += 72;
            this.add.text(32, y, '- Welcome. I am General Error. Your new job starts today.', { fontSize: '16px', fill: '#88aa77' });
            y += 20;
            this.add.text(32, y, '- Every man and woman must do his or her part in this time of crisis.', { fontSize: '16px', fill: '#88aa77' });
            y += 20;
            this.add.text(32, y, '- We appreciate what you are doing for your country.', { fontSize: '16px', fill: '#88aa77' });
            y += 20;
            this.add.text(32, y, '- We use a three shift system. Time for your first shift at SHAPE.', { fontSize: '16px', fill: '#88aa77' });
            y += 20;
            this.add.text(32, y, '- Your first shapeshift, as I like to call it!', { fontSize: '16px', fill: '#88aa77' });
            y += 44;
            this.add.text(128, y, 'Click to proceed.', { fontSize: '24px', fill: '#88aa77' });
            this.add.text(32, 600 - 16, 'A game for Ludum Dare 35 by Mathias Olsson.', { fontSize: '8px', fill: '#88aa77' });
            this.input.onDown.addOnce(this.startGame, this);
            var x = this.world.width + 100;
            y = y + 144;
            var xGoal = 0 - 100;
            var yGoal = y;
            var generalError = new Mordor.Soldier(this.game, 'generalerror', x, y + this.rnd.between(-16, 16), this.group, 'General Error');
            generalError.setGoal(xGoal, yGoal);
            x += 112;
            var majorFailure = new Mordor.Soldier(this.game, 'general2', x, y + this.rnd.between(-16, 16), this.group, 'Major Failure');
            majorFailure.setGoal(xGoal, yGoal);
            x += 112;
            var corporalPunishment = new Mordor.Soldier(this.game, 'general1', x, y + this.rnd.between(-16, 16), this.group, 'Corporal Punishment');
            corporalPunishment.setGoal(xGoal, yGoal);
            x += 112;
            var privateParts = new Mordor.Soldier(this.game, 'player', x, y + this.rnd.between(-16, 16), this.group, 'Private Parts');
            privateParts.setGoal(xGoal, yGoal);
            x += 112;
            var privateDetective = new Mordor.Soldier(this.game, 'player', x, y + this.rnd.between(-16, 16), this.group, 'Private Detective');
            privateDetective.setGoal(xGoal, yGoal);
            x += 112;
            var privateRoad = new Mordor.Soldier(this.game, 'player', x, y + this.rnd.between(-16, 16), this.group, 'Private Road');
            privateRoad.setGoal(xGoal, yGoal);
            x += 112;
            // Setup a few random soldiers
            var diff = 60;
            var y1 = y - diff;
            var y2 = y + diff;
            for (var i = 0; i < 20; i += 2) {
                var soldierBoy1 = new Mordor.Soldier(this.game, 'player', x, y1 + this.rnd.between(-16, 16), this.group, 'Cannon Fodder');
                soldierBoy1.setGoal(xGoal, yGoal - diff);
                var soldierBoy2 = new Mordor.Soldier(this.game, 'player', x, y2 + this.rnd.between(-16, 16), this.group, 'Cannon Fodder');
                soldierBoy2.setGoal(xGoal, yGoal + diff);
                x += 112;
            }
            this.music = this.add.audio('music');
            this.music.loop = true;
            this.music.play();
        };
        MainMenu.prototype.update = function () {
        };
        MainMenu.prototype.startGame = function () {
            this.game.state.start("Level1", true, false);
        };
        return MainMenu;
    }(Phaser.State));
    Mordor.MainMenu = MainMenu;
})(Mordor || (Mordor = {}));
/// <reference path="typescript/phaser.d.ts" />
// python -m SimpleHTTPServer
var Mordor;
(function (Mordor) {
    var Level1 = (function (_super) {
        __extends(Level1, _super);
        function Level1() {
            _super.apply(this, arguments);
        }
        Level1.prototype.tutorial = function () {
            var y = this.world.height - 100;
            var x = 200;
            var tutFast = this.add.text(x, -40, 'General Error says: Move UP through hangar 18 as fast as possible', { fontSize: '16px', fill: '#eeeeee' });
            var fastTween = this.add.tween(tutFast).to({ y: y }, 2400, Phaser.Easing.Bounce.Out);
            y -= 250;
            var tutArrow = this.add.text(x, -40, 'General Error says: Press arrow keys to move', { fontSize: '16px', fill: '#eeeeee' });
            var arrowTween = this.add.tween(tutArrow).to({ y: y }, 2400, Phaser.Easing.Bounce.Out);
            y -= 250;
            var tutGoal1 = this.add.text(x, -40, 'General Error says: Keep on moving, soldier! Faster!', { fontSize: '16px', fill: '#eeeeee' });
            var goal1Tween = this.add.tween(tutGoal1).to({ y: y }, 2400, Phaser.Easing.Bounce.Out);
            y -= 250;
            var tutBack = this.add.text(x, -40, 'General Error says: You cannot move back', { fontSize: '16px', fill: '#eeeeee' });
            var backTween = this.add.tween(tutBack).to({ y: y }, 2400, Phaser.Easing.Bounce.Out);
            y -= 250;
            var tutBroom = this.add.text(x, -40, 'General Error says: Press and hold spacebar to use your weapaon', { fontSize: '16px', fill: '#eeeeee' });
            var broomTween = this.add.tween(tutBroom).to({ y: y }, 2400, Phaser.Easing.Bounce.Out);
            y -= 250;
            var tutClean = this.add.text(x, -40, 'General Error says: Clean up after the other soldiers', { fontSize: '16px', fill: '#eeeeee' });
            var cleanTween = this.add.tween(tutClean).to({ y: y }, 2400, Phaser.Easing.Bounce.Out);
            y -= 250 / 2;
            var tutRank = this.add.text(x, -40, 'General Error says: The better you clean, the higher your rank', { fontSize: '16px', fill: '#eeeeee' });
            var rankTween = this.add.tween(tutRank).to({ y: y }, 2400, Phaser.Easing.Bounce.Out);
            y -= 250 / 2;
            var tutWeapon = this.add.text(x, -40, 'General Error says: No, you won\'t get a proper weapon!', { fontSize: '16px', fill: '#eeeeee' });
            var weapeonTween = this.add.tween(tutWeapon).to({ y: y }, 2400, Phaser.Easing.Bounce.Out);
            y -= 250;
            var tutGoal = this.add.text(x, -40, 'General Error says: Keep on moving, soldier! Faster!', { fontSize: '16px', fill: '#eeeeee' });
            var goalTween = this.add.tween(tutGoal).to({ y: y }, 2400, Phaser.Easing.Bounce.Out);
            y -= 250;
            var tutMissed = this.add.text(x, -40, 'General Error says: I think you missed a spot', { fontSize: '16px', fill: '#eeeeee' });
            var missedTween = this.add.tween(tutMissed).to({ y: y }, 2400, Phaser.Easing.Bounce.Out);
            y -= 250;
            fastTween.chain(arrowTween, goal1Tween, backTween, broomTween, cleanTween, rankTween, weapeonTween, goalTween, missedTween);
            fastTween.start();
        };
        Level1.prototype.create = function () {
            var width = 800;
            var height = 600;
            this.isLevelDone = false;
            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.stage.backgroundColor = "#000000";
            this.map = this.add.tilemap('level1');
            this.map.addTilesetImage('Floortiles');
            this.layer = this.map.createLayer('Ground');
            this.layer.resizeWorld();
            this.camera.y = this.world.height;
            this.group = this.add.physicsGroup(Phaser.Physics.ARCADE);
            var tmp = this.game;
            if (tmp.score === 0) {
                this.tutorial();
            }
            this.oldRank = tmp.rankFromScore(tmp.score);
            var rank = tmp.rankFromScore(tmp.score);
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
            var privateParts = new Mordor.Soldier(this.game, 'player', -100, this.world.height - 200, this.group);
            privateParts.setGoal(this.world.width + 100, this.world.height - 200);
            var privateDetective = new Mordor.Soldier(this.game, 'player', this.world.width / 2, this.world.height + 100, this.group);
            privateDetective.setGoal(this.world.width / 2, 0 - 100);
            var privateEye = new Mordor.Soldier(this.game, 'player', this.world.width + 100, this.world.height / 2, this.group);
            privateEye.setGoal(0 - 100, this.world.height / 2 - 100);
            var majorFailure = new Mordor.Soldier(this.game, 'general1', 100, -100, this.group);
            majorFailure.setGoal(150, this.world.height + 100);
            var corporalPunishment = new Mordor.Soldier(this.game, 'general2', this.world.width + 100, this.world.height - 200, this.group);
            corporalPunishment.setGoal(100, -100);
            var generalError = new Mordor.Soldier(this.game, 'generalerror', this.world.width + 100, 800, this.group);
            generalError.setGoal(0 - 100, 1000);
            this.scoreText = this.add.text(200, 500, 'score: 0', { fontSize: '32px', fill: '#000' });
            this.scoreText.text = 'Score: ' + tmp.score;
            this.scoreText.fixedToCamera = true;
            this.scoreText.cameraOffset.setTo(50, height - 50);
            var introText = this.add.text(width / 2, this.world.height - height / 2, '- The Hangar 18 Shift -', { fontSize: '32px', fill: '#eeeeee' });
            introText.anchor = new Phaser.Point(0.5, 0.5);
            introText.alpha = 0.0;
            var tweenIn = this.game.add.tween(introText).to({ alpha: 1.0 }, 1500, Phaser.Easing.Linear.None);
            var tweenOut = this.game.add.tween(introText).to({ alpha: 0.0 }, 1500, Phaser.Easing.Linear.None);
            tweenIn.chain(tweenOut);
            tweenIn.start();
            this.doneSound = this.game.add.audio('levelcomplete');
            this.doneSound.volume = 1.0;
        };
        Level1.prototype.update = function () {
            if (this.physics.arcade.overlap(this.player.broom, this.group, this.collisionHandler, this.processHandler, this)) {
            }
            if (this.physics.arcade.overlap(this.player, this.group, this.collisionHandler, this.processHandler, this)) {
            }
            if (this.player.y < 15 * 6 && this.isLevelDone === false) {
                // Level complete
                this.isLevelDone = true;
                this.player.stop();
                var width = 800;
                var height = 600;
                var outroText = this.add.text(width / 2, height / 2 - 64, 'Shift completed', { fontSize: '32px', fill: '#eeeeee' });
                outroText.anchor = new Phaser.Point(0.5, 0.5);
                outroText.alpha = 0.0;
                var tweenIn2 = this.game.add.tween(outroText).to({ alpha: 1.0 }, 2500, Phaser.Easing.Linear.None, false, 3000);
                var tweenOut2 = this.game.add.tween(outroText).to({ alpha: 0.0 }, 2500, Phaser.Easing.Linear.None);
                tweenIn2.chain(tweenOut2);
                tweenIn2.start();
                tweenOut2.onComplete.add(this.levelDone, this);
                this.doneSound.play();
                var tmp = this.game;
                if (this.oldRank !== tmp.rankFromScore(tmp.score)) {
                    var rankText = this.add.text(width / 2, height / 3 - 64, 'General Error says: You shift shape to a new rank. Well done!', { fontSize: '24px', fill: '#eeeeee' });
                    rankText.anchor = new Phaser.Point(0.5, 0.5);
                    rankText.alpha = 0.0;
                    var tweenIn3 = this.game.add.tween(rankText).to({ alpha: 1.0 }, 1500, Phaser.Easing.Linear.None, false, 2000);
                    var tweenOut3 = this.game.add.tween(rankText).to({ alpha: 0.0 }, 1500, Phaser.Easing.Linear.None);
                    tweenIn3.chain(tweenOut3);
                    tweenIn3.start();
                }
            }
        };
        Level1.prototype.levelDone = function () {
            this.game.state.start("Level2", true, false);
        };
        Level1.prototype.render = function () {
            /*            this.game.debug.cameraInfo(this.camera, 32, 32);
                        this.game.debug.body(this.player.broom);
                        this.game.debug.body(this.player);
                        this.group.forEach((item) => {this.game.debug.body(item)}, this);
            */
        };
        Level1.prototype.processHandler = function (broom, shoeprint) {
            if (!this.player.isCleaning) {
                return false;
            }
            var dx = this.player.x + broom.x - shoeprint.x;
            var dy = this.player.y + broom.y - shoeprint.y;
            var distance = dx * dx + dy * dy;
            if (distance > 50 * 50) {
                return false;
            }
            else {
                return true;
            }
        };
        Level1.prototype.collisionHandler = function (broom, shoeprint) {
            if (this.player.isCleaning) {
                if (shoeprint.alpha > 0.1) {
                    shoeprint.alpha -= 0.1;
                }
                else {
                    shoeprint.kill();
                    var tmp = this.game;
                    tmp.score += 10;
                    this.scoreText.text = 'Score: ' + tmp.score;
                }
            }
        };
        Level1.prototype.soldierOut = function (soldier) {
            //  Move the alien to the top of the screen again
            // alien.reset(alien.x, -32);
            //  And give it a new random velocity
            //  alien.body.velocity.y = 50 + Math.random() * 200;
            var b = 42;
        };
        return Level1;
    }(Phaser.State));
    Mordor.Level1 = Level1;
})(Mordor || (Mordor = {}));
/// <reference path="typescript/phaser.d.ts" />
// python -m SimpleHTTPServer
var Mordor;
(function (Mordor) {
    var Level2 = (function (_super) {
        __extends(Level2, _super);
        function Level2() {
            _super.apply(this, arguments);
        }
        Level2.prototype.create = function () {
            // TODO Merge all common functionality into one class
            var width = 800;
            var height = 600;
            this.isLevelDone = false;
            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.stage.backgroundColor = "#000000";
            this.map = this.add.tilemap('level1');
            this.map.addTilesetImage('Floortiles');
            this.layer = this.map.createLayer('Outdoor');
            this.layer.resizeWorld();
            this.camera.y = this.world.height;
            this.group = this.add.physicsGroup(Phaser.Physics.ARCADE);
            var tmp = this.game;
            this.oldRank = tmp.rankFromScore(tmp.score);
            var rank = tmp.rankFromScore(tmp.score);
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
            var privateParts = new Mordor.Soldier(this.game, 'player', this.world.width, this.world.height + 100, this.group);
            privateParts.setGoal(0, -100);
            var privateDetective = new Mordor.Soldier(this.game, 'player', 0, this.world.height + 100, this.group);
            privateDetective.setGoal(this.world.width, -100);
            var privateEye = new Mordor.Soldier(this.game, 'player', this.world.width / 2, this.world.height + 100, this.group);
            privateEye.setGoal(this.world.width / 2 - 64, -100);
            var majorFailure = new Mordor.Soldier(this.game, 'general1', -100, (this.world.height / 3) * 2, this.group);
            majorFailure.setGoal(this.world.width + 100, (this.world.height / 3) * 1);
            var corporalPunishment = new Mordor.Soldier(this.game, 'general2', this.world.width + 100, (this.world.height / 3) * 1, this.group);
            corporalPunishment.setGoal(-100, (this.world.height / 3) * 2);
            var generalError = new Mordor.Soldier(this.game, 'generalerror', this.world.width + 100, this.world.height / 2 - 100, this.group);
            generalError.setGoal(-100, this.world.height / 2 + 100);
            this.scoreText = this.add.text(200, 500, 'score: 0', { fontSize: '32px', fill: '#000' });
            this.scoreText.text = 'Score: ' + tmp.score;
            this.scoreText.fixedToCamera = true;
            this.scoreText.cameraOffset.setTo(50, height - 50);
            var introText = this.add.text(width / 2, this.world.height - height / 2, '- The Excersice Yard Shift -', { fontSize: '32px', fill: '#eeeeee' });
            introText.anchor = new Phaser.Point(0.5, 0.5);
            introText.alpha = 0.0;
            var tweenIn = this.game.add.tween(introText).to({ alpha: 1.0 }, 1500, Phaser.Easing.Linear.None);
            var tweenOut = this.game.add.tween(introText).to({ alpha: 0.0 }, 1500, Phaser.Easing.Linear.None);
            tweenIn.chain(tweenOut);
            tweenIn.start();
            this.doneSound = this.game.add.audio('levelcomplete');
            this.doneSound.volume = 1.0;
        };
        Level2.prototype.update = function () {
            if (this.physics.arcade.overlap(this.player.broom, this.group, this.collisionHandler, this.processHandler, this)) {
            }
            if (this.physics.arcade.overlap(this.player, this.group, this.collisionHandler, this.processHandler, this)) {
            }
            if (this.player.y < 15 * 6 && this.isLevelDone === false) {
                // Level complete
                this.isLevelDone = true;
                this.player.stop();
                var width = 800;
                var height = 600;
                var outroText = this.add.text(width / 2, height / 2 - 64, 'Shift completed', { fontSize: '32px', fill: '#eeeeee' });
                outroText.anchor = new Phaser.Point(0.5, 0.5);
                outroText.alpha = 0.0;
                var tweenIn2 = this.game.add.tween(outroText).to({ alpha: 1.0 }, 2500, Phaser.Easing.Linear.None, false, 3000);
                var tweenOut2 = this.game.add.tween(outroText).to({ alpha: 0.0 }, 2500, Phaser.Easing.Linear.None);
                tweenIn2.chain(tweenOut2);
                tweenIn2.start();
                tweenOut2.onComplete.add(this.levelDone, this);
                this.doneSound.play();
                var tmp = this.game;
                if (this.oldRank !== tmp.rankFromScore(tmp.score)) {
                    var rankText = this.add.text(width / 2, height / 3 - 64, 'General Error says: You shift shape to a new rank. Well done!', { fontSize: '24px', fill: '#eeeeee' });
                    rankText.anchor = new Phaser.Point(0.5, 0.5);
                    rankText.alpha = 0.0;
                    var tweenIn3 = this.game.add.tween(rankText).to({ alpha: 1.0 }, 1500, Phaser.Easing.Linear.None, false, 2000);
                    var tweenOut3 = this.game.add.tween(rankText).to({ alpha: 0.0 }, 1500, Phaser.Easing.Linear.None);
                    tweenIn3.chain(tweenOut3);
                    tweenIn3.start();
                }
            }
        };
        Level2.prototype.levelDone = function () {
            this.game.state.start("Level3", true, false);
        };
        Level2.prototype.render = function () {
            /*            this.game.debug.cameraInfo(this.camera, 32, 32);
                        this.game.debug.body(this.player.broom);
                        this.game.debug.body(this.player);
                        this.group.forEach((item) => {this.game.debug.body(item)}, this);
            */
        };
        Level2.prototype.processHandler = function (broom, shoeprint) {
            if (!this.player.isCleaning) {
                return false;
            }
            var dx = this.player.x + broom.x - shoeprint.x;
            var dy = this.player.y + broom.y - shoeprint.y;
            var distance = dx * dx + dy * dy;
            if (distance > 50 * 50) {
                return false;
            }
            else {
                return true;
            }
        };
        Level2.prototype.collisionHandler = function (broom, shoeprint) {
            if (this.player.isCleaning) {
                if (shoeprint.alpha > 0.1) {
                    shoeprint.alpha -= 0.1;
                }
                else {
                    shoeprint.kill();
                    var tmp = this.game;
                    tmp.score += 10;
                    this.scoreText.text = 'Score: ' + tmp.score;
                }
            }
        };
        Level2.prototype.soldierOut = function (soldier) {
            //  Move the alien to the top of the screen again
            // alien.reset(alien.x, -32);
            //  And give it a new random velocity
            //  alien.body.velocity.y = 50 + Math.random() * 200;
            var b = 42;
        };
        return Level2;
    }(Phaser.State));
    Mordor.Level2 = Level2;
})(Mordor || (Mordor = {}));
/// <reference path="typescript/phaser.d.ts" />
// python -m SimpleHTTPServer
var Mordor;
(function (Mordor) {
    var Level3 = (function (_super) {
        __extends(Level3, _super);
        function Level3() {
            _super.apply(this, arguments);
        }
        Level3.prototype.create = function () {
            var width = 800;
            var height = 600;
            this.isLevelDone = false;
            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.stage.backgroundColor = "#000000";
            this.map = this.add.tilemap('level1');
            this.map.addTilesetImage('Floortiles');
            this.layer = this.map.createLayer('Jungle');
            this.layer.resizeWorld();
            this.camera.y = this.world.height;
            this.group = this.add.physicsGroup(Phaser.Physics.ARCADE);
            var tmp = this.game;
            this.oldRank = tmp.rankFromScore(tmp.score);
            var rank = tmp.rankFromScore(tmp.score);
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
            var privateParts = new Mordor.Soldier(this.game, 'player', -100, this.world.height - 200, this.group);
            privateParts.setGoal(this.world.width + 100, this.world.height - 200);
            var privateDetective = new Mordor.Soldier(this.game, 'player', this.world.width / 2, this.world.height + 100, this.group);
            privateDetective.setGoal(this.world.width / 2, 0 - 100);
            var privateEye = new Mordor.Soldier(this.game, 'player', this.world.width + 100, this.world.height / 2, this.group);
            privateEye.setGoal(0 - 100, this.world.height / 2 - 100);
            var majorFailure = new Mordor.Soldier(this.game, 'general1', 100, -100, this.group);
            majorFailure.setGoal(150, this.world.height + 100);
            var corporalPunishment = new Mordor.Soldier(this.game, 'general2', this.world.width + 100, this.world.height - 200, this.group);
            corporalPunishment.setGoal(100, -100);
            var generalError = new Mordor.Soldier(this.game, 'generalerror', this.world.width + 100, 800, this.group);
            generalError.setGoal(0 - 100, 1000);
            this.scoreText = this.add.text(200, 500, 'score: 0', { fontSize: '32px', fill: '#000' });
            this.scoreText.text = 'Score: ' + tmp.score;
            this.scoreText.fixedToCamera = true;
            this.scoreText.cameraOffset.setTo(50, height - 50);
            var introText = this.add.text(width / 2, this.world.height - height / 2, '- The Jungle Battle Shift -', { fontSize: '32px', fill: '#eeeeee' });
            introText.anchor = new Phaser.Point(0.5, 0.5);
            introText.alpha = 0.0;
            var tweenIn = this.game.add.tween(introText).to({ alpha: 1.0 }, 1500, Phaser.Easing.Linear.None);
            var tweenOut = this.game.add.tween(introText).to({ alpha: 0.0 }, 1500, Phaser.Easing.Linear.None);
            tweenIn.chain(tweenOut);
            tweenIn.start();
            this.doneSound = this.game.add.audio('levelcomplete');
            this.doneSound.volume = 1.0;
        };
        Level3.prototype.update = function () {
            if (this.physics.arcade.overlap(this.player.broom, this.group, this.collisionHandler, this.processHandler, this)) {
            }
            if (this.physics.arcade.overlap(this.player, this.group, this.collisionHandler, this.processHandler, this)) {
            }
            if (this.player.y < 15 * 6 && this.isLevelDone === false) {
                // Level complete
                this.isLevelDone = true;
                this.player.stop();
                var width = 800;
                var height = 600;
                var outroText = this.add.text(width / 2, height / 2 - 64, 'Shift completed', { fontSize: '32px', fill: '#eeeeee' });
                outroText.anchor = new Phaser.Point(0.5, 0.5);
                outroText.alpha = 0.0;
                var tweenIn2 = this.game.add.tween(outroText).to({ alpha: 1.0 }, 2500, Phaser.Easing.Linear.None, false, 3000);
                var tweenOut2 = this.game.add.tween(outroText).to({ alpha: 0.0 }, 2500, Phaser.Easing.Linear.None);
                tweenIn2.chain(tweenOut2);
                tweenIn2.start();
                tweenOut2.onComplete.add(this.levelDone, this);
                this.doneSound.play();
                var tmp = this.game;
                if (this.oldRank !== tmp.rankFromScore(tmp.score)) {
                    var rankText = this.add.text(width / 2, height / 3 - 64, 'General Error says: You shift shape to a new rank. Well done!', { fontSize: '24px', fill: '#eeeeee' });
                    rankText.anchor = new Phaser.Point(0.5, 0.5);
                    rankText.alpha = 0.0;
                    var tweenIn3 = this.game.add.tween(rankText).to({ alpha: 1.0 }, 1500, Phaser.Easing.Linear.None, false, 2000);
                    var tweenOut3 = this.game.add.tween(rankText).to({ alpha: 0.0 }, 1500, Phaser.Easing.Linear.None);
                    tweenIn3.chain(tweenOut3);
                    tweenIn3.start();
                }
            }
        };
        Level3.prototype.levelDone = function () {
            this.game.state.start("Level1", true, false);
        };
        Level3.prototype.render = function () {
            /*            this.game.debug.cameraInfo(this.camera, 32, 32);
                        this.game.debug.body(this.player.broom);
                        this.game.debug.body(this.player);
                        this.group.forEach((item) => {this.game.debug.body(item)}, this);
            */
        };
        Level3.prototype.processHandler = function (broom, shoeprint) {
            if (!this.player.isCleaning) {
                return false;
            }
            var dx = this.player.x + broom.x - shoeprint.x;
            var dy = this.player.y + broom.y - shoeprint.y;
            var distance = dx * dx + dy * dy;
            if (distance > 50 * 50) {
                return false;
            }
            else {
                return true;
            }
        };
        Level3.prototype.collisionHandler = function (broom, shoeprint) {
            if (this.player.isCleaning) {
                if (shoeprint.alpha > 0.1) {
                    shoeprint.alpha -= 0.1;
                }
                else {
                    shoeprint.kill();
                    var tmp = this.game;
                    tmp.score += 10;
                    this.scoreText.text = 'Score: ' + tmp.score;
                }
            }
        };
        Level3.prototype.soldierOut = function (soldier) {
            //  Move the alien to the top of the screen again
            // alien.reset(alien.x, -32);
            //  And give it a new random velocity
            //  alien.body.velocity.y = 50 + Math.random() * 200;
            var b = 42;
        };
        return Level3;
    }(Phaser.State));
    Mordor.Level3 = Level3;
})(Mordor || (Mordor = {}));
/// <reference path="typescript/phaser.d.ts" />
// python -m SimpleHTTPServer
var Mordor;
(function (Mordor) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y, name, displayName) {
            _super.call(this, game, x, y, name, 0);
            this.anchor.setTo(0.5, 0.5);
            this.scale = new Phaser.Point(3.0, 3.0);
            this.animations.add('walk', [1, 0, 2, 0], 4, true);
            this.animations.add('broom', [1, 0], 8, true);
            this.broom = this.game.make.sprite(10, -4, 'broom');
            this.broom.anchor.setTo(0.5, 1.0);
            //     this.broom.scale = new Phaser.Point(3.0, 3.0);
            this.broom.rotation = 15 * (Math.PI / 180);
            game.add.tween(this.broom).to({ rotation: -15 * (Math.PI / 180) }, 2000, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
            this.addChild(this.broom);
            game.physics.enable(this.broom);
            //      this.broom.body.setSize(8,16,0,0);
            this.isCleaning = false;
            game.add.existing(this);
            game.physics.enable(this);
            this.body.collideWorldBounds = true;
            this.body.setSize(32, 32, 0, -16);
            if (displayName !== null) {
                this.displayName = game.add.text(x, y, displayName, { fontSize: '12px', fill: '#aacc99' });
            }
            this.sopa1 = this.game.add.audio('sopa1');
            this.sopa1.volume = 0.05;
            this.sopa2 = this.game.add.audio('sopa2');
            this.sopa2.volume = 0.05;
            this.isStopped = false;
        }
        Player.prototype.update = function () {
            if (this.displayName !== null) {
                this.displayName.x = this.x - this.displayName.width / 2;
                this.displayName.y = this.y + 48;
            }
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            this.game.world.setBounds(0, 0, 800, this.game.camera.y + 600);
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
                        if (this.game.rnd.between(0, 1) === 0) {
                            this.sopa1.play();
                        }
                        else {
                            this.sopa2.play();
                        }
                    }
                    return;
                }
                else {
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
            }
            else {
                this.animations.play("walk");
                this.rotation = 90 * (Math.PI / 180) + Math.atan2(this.body.velocity.y, this.body.velocity.x);
            }
        };
        Player.prototype.stop = function () {
            this.isStopped = true;
        };
        return Player;
    }(Phaser.Sprite));
    Mordor.Player = Player;
})(Mordor || (Mordor = {}));
/// <reference path="typescript/phaser.d.ts" />
// python -m SimpleHTTPServer
var Mordor;
(function (Mordor) {
    var Soldier = (function (_super) {
        __extends(Soldier, _super);
        function Soldier(game, name, x, y, group, displayName) {
            _super.call(this, game, x, y, name, 0);
            this.shoeprintGroup = group;
            this.anchor.setTo(0.5, 0.5);
            this.scale = new Phaser.Point(3.0, 3.0);
            this.animations.add('walk', [1, 0, 2, 0], 4, true);
            this.animations.play('walk');
            this.prevFrame = -1;
            game.add.existing(this);
            game.physics.enable(this);
            if (displayName !== null) {
                this.displayName = game.add.text(x, y, displayName, { fontSize: '12px', fill: '#aacc99' });
            }
        }
        Soldier.prototype.createShoeprint = function (x, y, name, frame) {
            var shoeprint = this.game.add.sprite(x, y, name, frame);
            shoeprint.anchor.setTo(0.5, 0.5);
            shoeprint.scale = new Phaser.Point(3.0, 3.0);
            shoeprint.rotation = this.rotation;
            shoeprint.moveDown();
            shoeprint.moveDown();
            this.game.physics.enable(shoeprint);
            this.shoeprintGroup.add(shoeprint);
            return shoeprint;
        };
        Soldier.prototype.setGoal = function (x, y) {
            this.goalX = x;
            this.goalY = y;
            var dx = this.x - x;
            var dy = this.y - y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            var time = (distance / 150) * 1000;
            var tween = this.game.add.tween(this).to({ x: x, y: y }, time, Phaser.Easing.Linear.None, true);
        };
        Soldier.prototype.inThisWorld = function () {
            if (this.x > this.game.world.width || this.x < 0 || this.y > this.game.world.height || this.y < 0) {
                return false;
            }
            return true;
        };
        Soldier.prototype.update = function () {
            var dx = this.x - this.goalX;
            var dy = this.y - this.goalY;
            this.rotation = -90 * (Math.PI / 180) + Math.atan2(dy, dx);
            if (this.inThisWorld()) {
                if (this.animations.frame !== this.prevFrame) {
                    this.prevFrame = this.animations.frame;
                    if (this.animations.frame === 1) {
                        var shoeprint = this.createShoeprint(this.x, this.y, 'shoeprints', 0);
                    }
                    else if (this.animations.frame === 2) {
                        var shoeprint = this.createShoeprint(this.x, this.y, 'shoeprints', 1);
                    }
                }
            }
            else {
                var b = 42;
            }
            if (this.displayName !== null) {
                this.displayName.x = this.x - this.displayName.width / 2;
                this.displayName.y = this.y + 48;
            }
        };
        return Soldier;
    }(Phaser.Sprite));
    Mordor.Soldier = Soldier;
})(Mordor || (Mordor = {}));
/// <reference path="typescript/phaser.d.ts" />
/// <reference path="Game.ts" />
/// <reference path="Boot.ts" />
/// <reference path="Preloader.ts" />
/// <reference path="MainMenu.ts" />
/// <reference path="Level1.ts" />
/// <reference path="Level2.ts" />
/// <reference path="Level3.ts" />
/// <reference path="Player.ts" />
/// <reference path="Soldier.ts" />
// python -m SimpleHTTPServer
window.onload = function () {
    var game = new Mordor.Game();
};
