// enemyConfig.js
// 敵の設定を定義
const enemyConfigs = {
    redEnemy: {
        color: 'red',
        size: 20,
        score: 100,
        shootInterval: 100,
        shootPattern: function() {
            const bullet = new EnemyBullet(this.positionX + this.size / 2, this.positionY + this.size, 0, 3);
            this.gameView.addEnemyBullet(bullet);
        }
    },
    blueEnemy: {
        color: 'blue',
        size: 20,
        score: 100,
        shootInterval: 100,
        shootPattern: function() {
            const bullet1 = new EnemyBlueBullet(this.positionX + this.size / 2, this.positionY + this.size, -2, 2);
            this.gameView.addEnemyBullet(bullet1);
            const bullet2 = new EnemyBlueBullet(this.positionX + this.size / 2, this.positionY + this.size, 0, 3);
            this.gameView.addEnemyBullet(bullet2);
            const bullet3 = new EnemyBlueBullet(this.positionX + this.size / 2, this.positionY + this.size, 2, 2);
            this.gameView.addEnemyBullet(bullet3);
        }
    },
    greenEnemy: {
        color: 'green',
        size: 40,
        score: 100,
        shootInterval: 100,
        isGreenEnemy: true, // 緑の敵であることを示すフラグ
        shootPattern: function(player) {
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
};
