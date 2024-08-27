class Enemy {
    constructor(x, y, speedX = 2, speedY = 2, size = 20) {
        this.positionX = x;
        this.positionY = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.size = size;
        this.existence = true; // 敵が存在しているかどうか
    }

    moveEnemy() {
        this.positionX += this.speedX;
        this.positionY += this.speedY;

        // 画面の境界で反射させる
        if (this.positionX < 0 || this.positionX > 640 - this.size) {
            this.speedX = -this.speedX;
        }
        if (this.positionY < 0 || this.positionY > 480 - this.size) {
            this.speedY = -this.speedY;
        }
    }

    drawEnemy(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.positionX, this.positionY, this.size, this.size);
    }

    checkCollision(bullet) {
        const dx = this.positionX + this.size / 2 - bullet.positionX;
        const dy = this.positionY + this.size / 2 - bullet.positionY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size / 2 + bullet.size) {
            this.existence = false; // 敵が倒された
            bullet.existence = false; // 弾が消える
            return true;
        }
        return false;
    }
}
