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
            this.player = new Mordor.Player(this.game, 300, this.world.height - 100);
            this.camera.follow(this.player);
        };
        Level1.prototype.update = function () {
            //            this.camera.y -= 0.04;
        };
        Level1.prototype.render = function () {
            this.game.debug.cameraInfo(this.camera, 32, 32);
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
            this.broom.rotation = 15 * (Math.PI / 180);
            game.add.tween(this.broom).to({ rotation: -15 * (Math.PI / 180) }, 2000, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
            this.addChild(this.broom);
            game.add.existing(this);
            game.physics.enable(this);
            this.body.collideWorldBounds = true;
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
                return;
            }
            else {
                this.animations.stop("broom");
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
/// <reference path="Game.ts" />
/// <reference path="Boot.ts" />
/// <reference path="Preloader.ts" />
/// <reference path="MainMenu.ts" />
/// <reference path="Level1.ts" />
/// <reference path="Player.ts" />
// python -m SimpleHTTPServer
window.onload = function () {
    var game = new Mordor.Game();
};
