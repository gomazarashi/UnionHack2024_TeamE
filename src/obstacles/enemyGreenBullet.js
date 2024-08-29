class EnemyGreenBullet extends EnemyBullet{
    constructor(x,y,player){
        super(x,y);
        this.player = player;
    }

    moveBullet(){
        const dx = this.player.positionX - this.positionX;
        const dy = this.player.positionY - this.positionY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        this.positionX += this.vectorX;
        this.positionY += this.vectorY;

        this.vectorX += (dx/distance)/4;
        this.vectorY += (dy/distance)/4;

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
        ctx.strokeStyle = "green";
        ctx.arc(this.positionX, this.positionY, this.size, 0, Math.PI * 2);
        ctx.stroke();
    }
}