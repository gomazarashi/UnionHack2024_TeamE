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

    shoot() {
        if (this.currentCooldown <= 0) {
            this.shoot3()
        } else {
            this.currentCooldown--; // クールダウンを減らす
        }
    }

    shoot3() {
        const bullet1 = new EnemyBlueBullet(this.positionX + this.size / 2, this.positionY + this.size,-2,2);
        this.gameView.addEnemyBullet(bullet1);
        const bullet2 = new EnemyBlueBullet(this.positionX + this.size / 2, this.positionY + this.size,0,3);
        this.gameView.addEnemyBullet(bullet2);
        const bullet3 = new EnemyBlueBullet(this.positionX + this.size / 2, this.positionY + this.size,2,2);
        this.gameView.addEnemyBullet(bullet3);
        this.currentCooldown = this.shootInterval; // クールダウンをリセット
    }

    checkCollision(bullet) {
        const dx = this.positionX + this.size / 2 - bullet.positionX;
        const dy = this.positionY + this.size / 2 - bullet.positionY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size / 2 + bullet.size) {
            this.shoot3();
            this.existence = false; // 敵が倒された
            bullet.existence = false; // 弾が消える
            return true;
        }
        return false;
    }
}