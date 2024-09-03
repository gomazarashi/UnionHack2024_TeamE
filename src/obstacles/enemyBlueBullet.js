// enemyBlueBullet.js
class EnemyBlueBullet extends EnemyBullet{
    constructor(x, y, Vx, Vy){
        super(x, y);
        this.vectorX = Vx;
        this.vectorY = Vy;
    }

    drawBullet(ctx){
        ctx.beginPath();
        ctx.strokeStyle = "aqua";
        ctx.arc(this.positionX, this.positionY, this.size, 0, Math.PI * 2);
        ctx.stroke();
    }
}