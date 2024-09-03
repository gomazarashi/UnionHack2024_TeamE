// enemyBullet.js
class EnemyBullet {
    constructor(x, y) {
        this.vectorX = 0;
        this.vectorY = 4;
        this.positionX = x;
        this.positionY = y;
        this.size = 5;
        this.existence = true;
    }

    moveBullet() {
        this.positionX += this.vectorX;
        this.positionY += this.vectorY;

        //画面外で消えるように
        if (this.positionX < -this.size) {
            this.existence = false;
            return
        }
        if (this.positionX > 640 + this.size) {
            this.existence = false;
            return
        }
        if (this.positionY < -this.size) {
            this.existence = false;
            return
        }
        if (this.positionY > 480 + this.size) {
            this.existence = false;
            return
        }
    }

    drawBullet(ctx){
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.arc(this.positionX, this.positionY, this.size, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.arc(this.positionX, this.positionY, this.size-1, 0, Math.PI * 2);
        ctx.stroke();
    }

    getExistence(){
        return this.existence;
    }

    checkCollisionWithPlayer(player) {
        const dx = this.positionX - player.positionX;
        const dy = this.positionY - player.positionY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        return distance < (this.size + 10); // プレイヤーのサイズに合わせた当たり判定
    }
}
