// 基底クラス: Enemy
class Enemy {
    constructor(x, y, speedX, speedY, size, color, score, shootInterval, gameView) {
        this.positionX = x;
        this.positionY = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.size = size;
        this.existence = true;
        this.score = score;
        this.shootInterval = shootInterval;
        this.currentCooldown = shootInterval;
        this.color = color;
        this.gameView = gameView;
    }

    moveEnemy() {
        this.positionX += this.speedX;
        this.positionY += this.speedY;

        if (this.positionX < 0 || this.positionX > 640 - this.size) {
            this.speedX = -this.speedX;
        }
        if (this.positionY < 0 || this.positionY > 480 - this.size) {
            this.speedY = -this.speedY;
        }
    }

    drawEnemy(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.positionX, this.positionY, this.size, this.size);
    }

    checkCollision(bullet) {
        const dx = this.positionX + this.size / 2 - bullet.positionX;
        const dy = this.positionY + this.size / 2 - bullet.positionY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size / 2 + bullet.size) {
            bullet.existence = false; // 弾が消える
            this.existence = false; // 敵が倒された
            this.dropItem();
            return true;
        }
        return false;
    }

    dropItem() {
        if (Math.random() <= 0.3) { // 60%の確率でアイテムを落とす
            const rand = Math.random();
            let itemType;

            if (rand <= 0.4) {
                itemType = 'speedUp';
            } else if (rand <= 0.8) {
                itemType = 'changeBulletType';
            } else {
                itemType = 'heal';
            }

            const newItem = new Item(this.positionX, this.positionY, itemType);
            this.gameView.addItem(newItem);
        }
    }

    shoot(player) {
        if (this.currentCooldown <= 0) {
            this.shootPattern(player); // サブクラスで定義される射撃パターンを呼び出す
            this.currentCooldown = this.shootInterval;
        } else {
            this.currentCooldown--;
        }
    }

    getEnemyScore() {
        return this.score;
    }
}

// サブクラス: RedEnemy
class RedEnemy extends Enemy {
    constructor(x, y, gameView) {
        super(x, y, 2, 2, 20, 'red', 100, 100, gameView); // 設定を直接指定
    }

    shootPattern() {
        const bullet = new EnemyBullet(this.positionX + this.size / 2, this.positionY + this.size, 0, 3);
        this.gameView.addEnemyBullet(bullet);
    }
}

// サブクラス: BlueEnemy
class BlueEnemy extends Enemy {
    constructor(x, y, gameView) {
        super(x, y, 2, 2, 20, 'blue', 100, 100, gameView); // 設定を直接指定
    }

    moveEnemy() {
        this.positionX += this.speedX;
        this.positionY += this.speedY;
        this.speedY -= Math.random(); // ランダムに速度を変更

        // 画面の境界で反射させる
        if (this.positionX < 0 || this.positionX > 640 - this.size) {
            this.speedX = -this.speedX;
        }
        if (this.positionY < 0) {
            this.speedY = -this.speedY;
        }
        if (this.positionY > 240 - this.size) {
            this.speedY = this.speedY / 2;
        }
    }

    shootPattern() {
        const bullet1 = new EnemyBlueBullet(this.positionX + this.size / 2, this.positionY + this.size, -2, 2);
        this.gameView.addEnemyBullet(bullet1);
        const bullet2 = new EnemyBlueBullet(this.positionX + this.size / 2, this.positionY + this.size, 0, 3);
        this.gameView.addEnemyBullet(bullet2);
        const bullet3 = new EnemyBlueBullet(this.positionX + this.size / 2, this.positionY + this.size, 2, 2);
        this.gameView.addEnemyBullet(bullet3);
    }
}

// サブクラス: GreenEnemy
class GreenEnemy extends Enemy {
    constructor(x, y, gameView) {
        super(x, y, 2, 2, 40, 'green', 100, 100, gameView); // 設定を直接指定
    }

    checkCollision(bullet) {
        const dx = this.positionX + this.size / 2 - bullet.positionX;
        const dy = this.positionY + this.size / 2 - bullet.positionY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size / 2 + bullet.size) {
            bullet.existence = false; // 弾が消える

            // サイズが10より大きければ半分にする
            if (this.size > 10) {
                this.size /= 2;
                this.positionX += this.size / 2;
                this.positionY += this.size / 2;
                return true; // 衝突があったことを返す
            }

            // サイズが小さければ敵を倒す
            this.existence = false;
            this.dropItem();
            return true;
        }
        return false;
    }

    shootPattern(player) {
        if (!player) {
            const bullet = new EnemyBullet(this.positionX + this.size / 2, this.positionY + this.size, 0, 3);
            this.gameView.addEnemyBullet(bullet);
        } else {
            const dx = player.positionX - this.positionX;
            const dy = player.positionY - this.positionY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance > 0) {
                const bullet = new EnemyGreenBullet(this.positionX + this.size / 2, this.positionY + this.size, player);
                this.gameView.addEnemyBullet(bullet);
            }
        }
    }
}
