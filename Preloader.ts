/// <reference path="typescript/phaser.d.ts" />

// python -m SimpleHTTPServer

namespace Mordor {

    export class Preloader extends Phaser.State {

        preloadBar: Phaser.Sprite;

        preload() {

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
            this.load.image('broom','assets/broom.png');
            this.load.spritesheet('shoeprints', 'assets/shoeprints.png', 32, 16, 2);
            this.load.image('oilstain','assets/oilstain.png');
            this.load.image('waterstain','assets/waterstain.png');
            this.load.image('bloodstain','assets/bloodstain.png');
            
            this.load.audio('music', ['assets/music.ogg','assets/music.mp3','assets/music.wav'], true);
            this.load.audio('sopa1', ['assets/sopa1.ogg','assets/sopa1.mp3','assets/sopa1.wav'], true);
            this.load.audio('sopa2', ['assets/sopa2.ogg','assets/sopa2.mp3','assets/sopa2.wav'], true);
            this.load.audio('levelcomplete', ['assets/levelcomplete.ogg','assets/levelcomplete.mp3','assets/levelcomplete.wav'], true);
        }

        create() {
            let tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        }

        startMainMenu() {
            this.game.state.start("MainMenu", true, false);
        }

    }

}
