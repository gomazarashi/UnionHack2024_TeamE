class BossCharacter {
    constructor() {
        this.positionX = 320; // ボスの初期X位置
        this.positionY = 50;  // ボスの初期Y位置
        this.width = 80;      // ボスの幅
        this.height = 60;     // ボスの高さ
        this.speed = 2;       // ボスの移動速度
        this.hp = 20;        // ボスの体力
        this.existence = false; // ボスの存在フラグ
        this.bullets = [];    // ボスが発射する弾の配列
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

    attack() {
        if (this.existence) {
            // ボスの攻撃
            this.bullets.push(new BossBullet(this.positionX, this.positionY, 0, 5));
        }
    }

    moveBullets() {
        // ボスの弾の移動
        this.bullets = this.bullets.filter(bullet => bullet.getExistence());
        this.bullets.forEach(bullet => {
            bullet.moveBullet();
            bullet.drawBullet(ctx);
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

    getExistence() {
        return this.existence;
    }
}
