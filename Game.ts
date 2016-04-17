/// <reference path="typescript/phaser.d.ts" />

// python -m SimpleHTTPServer

namespace Mordor {

    export class Game extends Phaser.Game {
        
        score: number

        rankFromScore(score: number) {
            let rank = 0;
            if (score < 750) {
                // Private
                rank = 0;
            } else if (score < 1500) {
                // general1
                rank = 1;
            } else if (score < 1750) {
                // general2
                rank = 2;
            } else {
                // generalerror
                rank = 3;
            }
            return rank;
        }

        constructor() {

            super(800, 600, Phaser.AUTO, "content", null);

            this.score = 0;

            this.state.add("Boot", Boot, false);
            this.state.add("Preloader", Preloader, false);
            this.state.add("MainMenu", MainMenu, false);
            this.state.add("Level1", Level1, false);
            this.state.add("Level2", Level2, false);
            this.state.add("Level3", Level3, false);

            this.state.start("Boot");

        }

    }

}
