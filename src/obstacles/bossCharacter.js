class BossCharacter {
    constructor(ctx) {
        this.positionX = 320; // ボスの初期X位置
        this.positionY = 50;  // ボスの初期Y位置
        this.width = 80;      // ボスの幅
        this.height = 60;     // ボスの高さ
        this.speed = 2;       // ボスの移動速度
        this.hp = 20;        // ボスの体力
        this.existence = false; // ボスの存在フラグ
        this.bullets = [];    // ボスが発射する弾の配列
        this.ctx = ctx;

        this.shootInterval = 100; // 発射間隔
        this.currentCooldown = 0; // クールダウンタイマー
    }

    drawBoss(ctx) {
        if (this.existence) {
            // ボスの外見を描画 赤い円と白いひし形の組み合わせ
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(this.positionX, this.positionY, this.width / 2, 0, 2 * Math.PI);
            ctx.fill();

            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.moveTo(this.positionX - this.width / 2, this.positionY);
            ctx.lineTo(this.positionX, this.positionY - this.height / 2);
            ctx.lineTo(this.positionX + this.width / 2, this.positionY);
            ctx.lineTo(this.positionX, this.positionY + this.height / 2);
            ctx.closePath();
            ctx.fill();

        }
    }

    moveBoss() {
        if (this.existence) {
            // ボスの動き
            this.positionX += this.speed;
            if (this.positionX > 640 - this.width / 2 || this.positionX < this.width / 2) {
                this.speed = -this.speed; // 画面端で反転
            }
        }
    }

    shoot() {
        if (this.existence) {
            // 発射クールダウンの管理
            if (this.currentCooldown <= 0) {
                this.currentCooldown = this.shootInterval; // クールダウンをリセット

                // 弾を10発発射（垂直方向に一列）
                for (let i = 0; i < 10; i++) {
                    const offsetY = i * 10; // 弾の垂直位置を調整
                    this.bullets.push(new BossBullet(this.positionX, this.positionY + offsetY, 0, 5)); // すべて下向きに発射
                }
            } else {
                this.currentCooldown--; // クールダウンを減らす
            }
        }
    }

    moveBullets() {
        // ボスの弾の移動
        this.bullets = this.bullets.filter(bullet => bullet.getExistence());
        this.bullets.forEach(bullet => {
            bullet.moveBullet();
            bullet.drawBullet(this.ctx);
        });
    }

    checkCollisionWithPlayer(player) {
        // ボスとプレイヤーの衝突判定
        if (this.existence && player) {
            let dx = this.positionX - player.positionX;
            let dy = this.positionY - player.positionY;
            let distance = Math.sqrt(dx * dx + dy * dy);

            return distance < (this.width / 2 + 15); // プレイヤーの幅は15と仮定
        }
        return false;
    }

    checkCollisionWithBullet(bullet) {
        // ボスとプレイヤーの弾の衝突判定
        if (this.existence) {
            let dx = this.positionX - bullet.positionX;
            let dy = this.positionY - bullet.positionY;
            let distance = Math.sqrt(dx * dx + dy * dy);

            return distance < (this.width / 2 + bullet.size);
        }
    }

    takeDamage(damage) {
        // ボスがダメージを受ける
        this.hp -= damage;
        if (this.hp <= 0) {
            this.existence = false; // HPが0以下になったらボスは存在しなくなる
        }
    }

    getExistence() {
        return this.existence;
    }
}

class BossBullet {
    constructor(x, y, dx, dy) {
        this.positionX = x;
        this.positionY = y;
        this.velocityX = dx;
        this.velocityY = dy;
        this.existence = true;
        this.size = 5; // 弾のサイズ
    }

    moveBullet() {
        this.positionX += this.velocityX;
        this.positionY += this.velocityY;
        if (this.positionX < 0 || this.positionX > 640 || this.positionY > 480) {
            this.existence = false; // 画面外に出たら弾は消える
        }
    }

    drawBullet(ctx) {
        if (this.existence) {
            ctx.fillStyle = "blue";
            ctx.beginPath();
            ctx.arc(this.positionX, this.positionY, this.size, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    checkCollisionWithPlayer(player) {
        const dx = this.positionX - player.positionX;
        const dy = this.positionY - player.positionY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        return distance < (this.size + 10); // プレイヤーのサイズに合わせた当たり判定
    }

    getExistence() {
        return this.existence;
    }
}
