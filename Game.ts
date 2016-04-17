/// <reference path="typescript/phaser.d.ts" />

// python -m SimpleHTTPServer

namespace Mordor {

    export class Game extends Phaser.Game {
        
        score: number

        rankFromScore(score: number) {
            let rank = Math.floor(score / 500);
            return rank;
        }
        
        spriteFromRank(rank: number) {
            let sprite = 'player';
            switch (rank) {
                case 0:
                    sprite = 'player';
                    break;
               case 1:
               case 2:
               case 3:
               case 4:
               case 5:
                    sprite = 'general1';
                    break;
               case 6:
               case 7:
               case 8:
               case 9:
                    sprite = 'general2';
                    break;
                default:
                    sprite = 'generalerror';
                    break;               
            }
            return sprite;
        }
        
        nameFromRank(rank: number) {
            let name = 'Private';
            switch (rank) {
                case 0:
                    name = 'Private';
                    break;
               case 1:
                    name = 'Private First Class';
                    break;
               case 2:
                    name = 'Corporal';
                    break;
               case 3:
                    name = 'Sergant';
                    break;
               case 4:
                    name = 'Sergant Major';
                    break;
               case 5:
                    name = 'First Lieutenant';
                    break;
               case 6:
                    name = 'Captain';
                    break;
               case 7:
                    name = 'Major';
                    break;
               case 8:
                    name = 'Lieutenant Colonel';
                    break;
               case 9:
                    name = 'Colonel';
                    break;
                default:
                    name = 'General';
                    if (rank > 25) {
                        name = 'General of the army';
                    }
                    if (rank > 50) {
                        name = 'General Zod';
                    }
                    if (rank > 100) {
                        name = 'God';
                    }
                    break;               
            }
            return name;
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
