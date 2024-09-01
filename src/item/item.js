class Item {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type; // アイテムの種類 
        this.size = 10; // アイテムのサイズ
        this.existence = true;
    }

    moveItem() {
        // アイテムを下に移動させる
        this.y += 2;
        // 画面外に出たら消す
        if (this.y > 480) this.existence = false;
    }

    drawItem(ctx) {
        if (this.type === 'speedUp') {
            ctx.fillStyle = 'rgb(255, 165, 0)'; // オレンジ色
        } else if (this.type === 'changeBulletType') {
            ctx.fillStyle = 'rgb(0, 0, 255)'; // 青色
        } else if (this.type === 'heal') {
            ctx.fillStyle = 'rgb(0, 128, 0)'; // 緑色
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.stroke();
    }

    checkCollision(player) {
        // プレイヤーとアイテムの衝突判定
        const dx = this.x - player.positionX;
        const dy = this.y - player.positionY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < (this.size + 10); // プレイヤーのサイズに合わせた当たり判定
    }
}
