class enemyFrequency{
    constructor(interval = 120, gameView){
        this.enemyList = new Array(10).fill(null);
        this.interval = interval;
        this.counter = 5;
        this.gameView = gameView; // gameView インスタンスを保持
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
        const x = Math.random()*640;
        const y = Math.random()*100;
        const speedX = Math.random()*3;
        const speedY = Math.random()*3;
        return new Enemy(x,y,speedX,speedY,20,100,100,this.gameView);
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