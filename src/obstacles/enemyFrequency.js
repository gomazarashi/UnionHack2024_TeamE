class enemyFrequency{
    constructor(interval = 120, gameView){
        this.enemyList = new Array(10).fill(null);
        this.interval = interval;
        this.counter = 5;
        this.gameView = gameView; // gameView インスタンスを保持
        this.enemyData = []
    }

    management(){
        if (this.counter<=0) {
            const index = this.enemyList.indexOf(null);
            if (index>=0) {
                this.enemyList[index] = this.createEnemy();
                this.counter = this.interval;
            }
        }else{
            this.counter--;
        }
    }

    createEnemy(){
        const x = (Math.random()*600)+20;
        const y = Math.random()*40 +20;
        const speedX = Math.random()*3;
        const speedY = Math.random()*3;
        const num = Math.random()*3
        if (num<1) {
            return new Enemy(x,y,speedX,speedY,20,100,100,this.gameView)
        }else if (num<2) {
            return new enemyBlue(x,y,speedX,speedY,20,100,100,this.gameView)
        }else{
            return new enemyGreen(x,y,speedX,speedY,40,100,100,this.gameView);
        }
    }

    moveAllEnemy(bulletArray, canvasStyle, ctx) {
        this.enemyList = this.enemyList.map(enemy => {
            if (enemy && enemy.existence) {
                bulletArray.forEach((bullet) => {
                    if (enemy.checkCollision(bullet)) {
                        console.log('Enemy hit!');
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
}