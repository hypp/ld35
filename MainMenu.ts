/// <reference path="typescript/phaser.d.ts" />

// python -m SimpleHTTPServer

namespace Mordor {

    export class MainMenu extends Phaser.State {

        background: Phaser.Sprite;

        create() {
            let y = 32;
            this.add.text(32, y, 'NATO SHAPE http://www.shape.nato.int/', { fontSize: '32px', fill: '#88aa77' });
            y += 36;
            this.add.text(32, y, 'Supreme Headquartes Allied Powers Europe', { fontSize: '32px', fill: '#88aa77' });
            y += 72;
            
            this.add.text(32,y, '- Welcome. I am General Error. Your new job starts today.', { fontSize: '16px', fill: '#88aa77' });
            y += 20;
            this.add.text(32,y, '- Every man and woman must to his or her part in this time of crises.', { fontSize: '16px', fill: '#88aa77' });
            y += 20;
            this.add.text(32,y, '- We appreciate that you are doing this for your country.', { fontSize: '16px', fill: '#88aa77' });
            y += 40;
            
            this.add.text(32,y, '- Time for your first shift. Your first shapeshift, as I like to call it!', { fontSize: '24px', fill: '#88aa77' });
            y += 44;
            this.add.text(128,y, 'Click to proceed.', { fontSize: '24px', fill: '#88aa77' });
            
            this.add.text(32,600-16, 'A game for Ludum Dare 35 by Mathias Olsson.', { fontSize: '8px', fill: '#88aa77' });

            this.input.onDown.addOnce(this.startGame, this);
        }

        startGame() {
            this.game.state.start("Level1", true, false);
        }

    }

}
