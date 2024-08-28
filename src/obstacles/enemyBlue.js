class enemyBlue extends Enemy{
    constructor(x, y, speedX = 2, speedY = 2, size = 20, score = 100, shootInterval = 100,gameView){
        super(x,y,speedX,speedY,size,score,shootInterval,gameView);
    }

    drawEnemy(ctx) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.positionX, this.positionY, this.size, this.size);
    }

    moveEnemy() {
        this.positionX += this.speedX;
        this.positionY += this.speedY;

        this.speedY -= Math.random();

        // 画面の境界で反射させる
        if (this.positionX < 0 || this.positionX > 640 - this.size) {
            this.speedX = -this.speedX;
        }
        if (this.positionY < 0) {
            this.speedY = -this.speedY;
        }
        if (this.positionY > 240 - this.size) {
            this.speedY = this.speedY/2
        }
    }
}