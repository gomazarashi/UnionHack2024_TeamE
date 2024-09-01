class EnemyGreen extends Enemy{

    constructor(x, y, speedX = 2, speedY = 2, size = 40, score = 100, shootInterval = 100,gameView){
        super(x,y,speedX,speedY,size,score,shootInterval,gameView);
    }

    drawEnemy(ctx) {
        ctx.fillStyle = 'Green';
        ctx.fillRect(this.positionX, this.positionY, this.size, this.size);
    }

    checkCollision(bullet) {
        const dx = this.positionX + this.size / 2 - bullet.positionX;
        const dy = this.positionY + this.size / 2 - bullet.positionY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size / 2 + bullet.size) {
            if (this.size > 10) {
                this.size /=2;
                this.score /=2;
                this.positionX+=this.size/2;
                this.positionY+=this.size/2;
                bullet.existence = false; // 弾が消える
                return true;
            }
            // アイテムを落とす処理
            if (Math.random() <= 0.6) { // 60%の確率でアイテムを落とす
                let itemType;
                if (Math.random() <= 0.3) {
                    itemType = 'speedUp';
                } else if (Math.random() <= 0.6) {
                    itemType = 'changeBulletType';
                } else {
                    itemType = 'heal';
                }

                this.dropItem(this.positionX, this.positionY, itemType);
            }
            this.existence = false; // 敵が倒された
            bullet.existence = false; // 弾が消える
            return true;
        }
        return false;
    }
    shoot(player) {
        if (!player) {
            super.shoot(); // プレイヤーが存在しない場合の処理
        } else {
            if (this.currentCooldown <= 0) {
                const dx = player.positionX - this.positionX;
                const dy = player.positionY - this.positionY;
                const distance = Math.sqrt(dx * dx + dy * dy);
    
                if (distance > 0) { // distanceがゼロでないことを確認
                    const bullet = new EnemyGreenBullet(this.positionX + this.size / 2,this.positionY + this.size,player);
                    this.gameView.addEnemyBullet(bullet);
                    this.currentCooldown = this.shootInterval; // クールダウンをリセット
                }
            } else {
                this.currentCooldown--; // クールダウンを減らす
            }
        }
    }    
}