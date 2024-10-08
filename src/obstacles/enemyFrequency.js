//enemyFrequency.js
class EnemyFrequency {
    constructor(interval = 120, gameView) {
        this.enemyList = new Array(10).fill(null);
        this.interval = interval;
        this.counter = 5;
        this.gameView = gameView; // gameView インスタンスを保持
        this.enemyData = []
    }

    management() {
        if (this.counter <= 0) {
            const index = this.enemyList.indexOf(null);
            if (index >= 0) {
                this.enemyList[index] = this.createEnemy();
                this.counter = this.interval;
            }
        } else {
            this.counter--;
        }
    }

    createEnemy() {
        const x = (Math.random() * 600) + 20;
        const y = Math.random() * 40 + 20;
        const num = Math.random() * 3
        if (num < 1) {
            return new RedEnemy(x, y, this.gameView);
        } else if (num < 2) {
            return new BlueEnemy(x, y, this.gameView);
        } else {
            return new GreenEnemy(x, y, this.gameView);
        }
    }

    moveAllEnemy(bulletArray, canvasStyle, ctx) {
        this.enemyList = this.enemyList.map(enemy => {
            if (enemy && enemy.existence) {
                bulletArray.forEach((bullet) => {
                    if (enemy.checkCollision(bullet)) {
                        canvasStyle.addScore(enemy.getEnemyScore()); // スコアを加算
                    }
                });
                enemy.moveEnemy();
                enemy.drawEnemy(ctx);
                return enemy;
            }
            return null;
        });
    }

    setIntervalFromCounter(bossCounter) {
        this.interval = parseInt(120 / Math.sqrt(bossCounter));
    };
}