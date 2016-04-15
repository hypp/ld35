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
            //            this.load.image("titlepage", "assets/titlepage.jpg");
            //            this.load.image("logo", "assets/logo.png");
            //            this.load.audio("music", "assets/title.mp3", true);
            //            this.load.spritesheet("simon", "assets/simon.png", 58, 96, 5);
            //            this.load.image("level1", "assets/level1.png");
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
            //  Modify the world and camera bounds
            this.world.setBounds(0, 0, width, height);
        };
        Level1.prototype.update = function () {
        };
        Level1.prototype.render = function () {
            this.game.debug.cameraInfo(this.camera, 32, 32);
        };
        return Level1;
    }(Phaser.State));
    Mordor.Level1 = Level1;
})(Mordor || (Mordor = {}));
/// <reference path="typescript/phaser.d.ts" />
/// <reference path="Game.ts" />
/// <reference path="Boot.ts" />
/// <reference path="Preloader.ts" />
/// <reference path="MainMenu.ts" />
/// <reference path="Level1.ts" />
// python -m SimpleHTTPServer
window.onload = function () {
    var game = new Mordor.Game();
};
