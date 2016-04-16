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
            this.state.add("Boot", Mordor.Boot, false);
            this.state.add("Preloader", Mordor.Preloader, false);
            this.state.add("MainMenu", Mordor.MainMenu, false);
            this.state.add("Level1", Mordor.Level1, false);
            this.state.start("Boot");
        }
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
            this.load.image('broom', 'assets/broom.png');
            this.load.spritesheet('shoeprints', 'assets/shoeprints.png', 32, 16, 2);
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
            var y = 32;
            this.add.text(32, y, 'NATO SHAPE http://www.shape.nato.int/', { fontSize: '32px', fill: '#88aa77' });
            y += 36;
            this.add.text(32, y, 'Supreme Headquartes Allied Powers Europe', { fontSize: '32px', fill: '#88aa77' });
            y += 72;
            this.add.text(32, y, '- Welcome. I am General Error. Your new job starts today.', { fontSize: '16px', fill: '#88aa77' });
            y += 20;
            this.add.text(32, y, '- Every man and woman must to his or her part in this time of crises.', { fontSize: '16px', fill: '#88aa77' });
            y += 20;
            this.add.text(32, y, '- We appreciate that you are doing this for your country.', { fontSize: '16px', fill: '#88aa77' });
            y += 40;
            this.add.text(32, y, '- Time for your first shift. Your first shapeshift, as I like to call it!', { fontSize: '24px', fill: '#88aa77' });
            y += 44;
            this.add.text(128, y, 'Click to proceed.', { fontSize: '24px', fill: '#88aa77' });
            this.add.text(32, 600 - 16, 'A game for Ludum Dare 35 by Mathias Olsson.', { fontSize: '8px', fill: '#88aa77' });
            this.input.onDown.addOnce(this.startGame, this);
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
        Level1.prototype.create = function () {
            var width = 800;
            var height = 600;
            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.stage.backgroundColor = "#000000";
            this.map = this.add.tilemap('level1');
            this.map.addTilesetImage('Floortiles');
            this.layer = this.map.createLayer('Ground');
            this.layer.resizeWorld();
            this.camera.y = this.world.height;
            this.group = this.add.physicsGroup(Phaser.Physics.ARCADE);
            this.player = new Mordor.Player(this.game, 300, this.world.height - 100);
            this.camera.follow(this.player);
            var privateParts = new Mordor.Soldier(this.game, -100, this.world.height - 200, this.group);
            privateParts.setGoal(this.world.width + 100, this.world.height - 200);
            var privateDetective = new Mordor.Soldier(this.game, this.world.width / 2, this.world.height + 100, this.group);
            privateDetective.setGoal(this.world.width / 2, 0 - 100);
            this.score = 0;
            this.scoreText = this.add.text(200, 500, 'score: 0', { fontSize: '32px', fill: '#000' });
            this.scoreText.fixedToCamera = true;
            this.scoreText.cameraOffset.setTo(50, height - 50);
            var introText = this.add.text(width / 2, this.world.height - height / 2, 'Level 1 - The Hangar', { fontSize: '32px', fill: '#eeeeee' });
            introText.anchor = new Phaser.Point(0.5, 0.5);
            introText.alpha = 0.0;
            var tweenIn = this.game.add.tween(introText).to({ alpha: 1.0 }, 1500, Phaser.Easing.Linear.None);
            var tweenOut = this.game.add.tween(introText).to({ alpha: 0.0 }, 1500, Phaser.Easing.Linear.None);
            tweenIn.chain(tweenOut);
            tweenIn.start();
        };
        Level1.prototype.update = function () {
            if (this.physics.arcade.overlap(this.player.broom, this.group, this.collisionHandler, this.processHandler, this)) {
            }
            if (this.physics.arcade.overlap(this.player, this.group, this.collisionHandler, this.processHandler, this)) {
            }
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
                    this.score += 10;
                    this.scoreText.text = 'Score: ' + this.score;
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
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            _super.call(this, game, x, y, "player", 0);
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
        }
        Player.prototype.update = function () {
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
                this.isCleaning = true;
                return;
            }
            else {
                this.animations.stop("broom");
                this.isCleaning = false;
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
            }
            else {
                this.rotation = 90 * (Math.PI / 180) + Math.atan2(this.body.velocity.y, this.body.velocity.x);
            }
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
        function Soldier(game, x, y, group) {
            _super.call(this, game, x, y, "player", 0);
            this.shoeprintGroup = group;
            this.anchor.setTo(0.5, 0.5);
            this.scale = new Phaser.Point(3.0, 3.0);
            this.animations.add('walk', [1, 0, 2, 0], 4, true);
            this.animations.play('walk');
            this.prevFrame = -1;
            game.add.existing(this);
            game.physics.enable(this);
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
/// <reference path="Player.ts" />
/// <reference path="Soldier.ts" />
// python -m SimpleHTTPServer
window.onload = function () {
    var game = new Mordor.Game();
};
