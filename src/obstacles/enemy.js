// enemy.js
class Enemy {
    constructor(x, y, speedX, speedY, config, GameView) {
        // 敵の初期位置
        this.positionX = x;
        this.positionY = y;

        // 敵の移動速度
        this.speedX = speedX;
        this.speedY = speedY;

        // 敵の大きさ
        this.size = config.size || 20;

        // 敵の存在フラグ
        this.existence = true;

        // 敵が倒された時のスコア
        this.score = config.score || 100;

        // 敵の弾を発射する間隔
        this.shootInterval = config.shootInterval || 100;
        this.currentCooldown = config.shootInterval;

        //敵の色
        this.color = config.color || 'red';

        //敵の射撃パターン
        this.shootPattern = config.shootPattern;

        this.gameView = GameView;

        this.isGreenEnemy = config.isGreenEnemy || false; // 緑の敵かどうかを判定するフラグ
    }

    // 敵の移動メソッド
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

    // 敵の描画メソッド
    drawEnemy(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.positionX, this.positionY, this.size, this.size);
    }

    // 弾との衝突判定
    checkCollision(bullet) {
        const dx = this.positionX + this.size / 2 - bullet.positionX;
        const dy = this.positionY + this.size / 2 - bullet.positionY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size / 2 + bullet.size) {
            // 緑の敵の特別な振る舞い
            if (this.isGreenEnemy && this.size > 10) {
                this.size /= 2; // サイズを半分にする
                this.positionX += this.size / 2;
                this.positionY += this.size / 2;
                bullet.existence = false; // 弾が消える
                return true;
            }
            this.existence = false; // 敵が倒された
            bullet.existence = false; // 弾が消える
            // アイテムを落とす処理
            this.dropItem();
            return true;
        }
        return false;
    }

    // 敵が倒された時アイテムを落とすメソッド
    dropItem() {
        // 60%の確率でアイテムを落とす
        this.dropProb = 0.6;
        if (Math.random() <= this.dropProb) {
            let itemType;
            if (Math.random() <= 0.4) { // 40%の確率でスピードアップアイテム
                itemType = 'speedUp';
            } else if (Math.random() <= 0.8) { // 40%の確率で弾の種類変更アイテム
                itemType = 'changeBulletType';
            } else { // 20%の確率で回復アイテム
                itemType = 'heal';
            }

            const newItem = new Item(this.positionX, this.positionY, itemType);
            this.gameView.addItem(newItem); // gameView インスタンスにアイテムを追加
        }
    }

    // 弾を発射するメソッド
    shoot(player) {
        if (this.currentCooldown <= 0) {
            this.shootPattern(player);
            this.currentCooldown = this.shootInterval;
        } else {
            this.currentCooldown--;
        }
    }

    // 敵を倒した時のスコアを返すメソッド
    getEnemyScore() {
        return this.score;
    }
}
