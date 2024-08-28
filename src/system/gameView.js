class gameView {
    constructor(canvas, ctx) {
        this.ctx = ctx;

        this.player = new playerControl()
        this.canvasStyle = new CanvasStyle(canvas, ctx);
        this.flag = false;

        this.enemyManager = new enemyFrequency();
    }

    update() {
        this.ctx.clearRect(0, 0, 640, 480);

        this.canvasStyle.drawBackground(); // 背景の描画
        this.canvasStyle.drawGameScreen(0, 3); // スコアとライフの表示

        // アイテムメニューの表示
        const items = ['Item 1', 'Item 2', 'Item 3'];
        this.canvasStyle.drawItemMenu(items);

        this.player.movePlayer();
        this.player.drawPlayer(this.ctx);
        // プレイヤーの弾の管理
        this.player.bulletControl(this.ctx);

        // 敵の弾とプレイヤーの衝突判定
        this.enemyManager.enemyList.forEach(enemy => {
            if (enemy && enemy.existence) {
                enemy.shoot(); // 敵の弾を撃つ
                enemy.bulletControl(this.ctx); // 敵の弾を描画

                // 敵の弾とプレイヤーの衝突判定
                enemy.enemyBulletArray.forEach(enemyBullet => {
                    if (enemyBullet.getExistence() && enemyBullet.checkCollisionWithPlayer(this.player)) {
                        this.canvasStyle.decreaseLife(); // プレイヤーのライフを減少
                        enemyBullet.existence = false; // 敵の弾を消す これを消すと1度あたった弾に何度もあたる
                        console.log('Player hit by enemy bullet!');
                    }
                });
            }
        });

        this.enemyManager.management()
        this.enemyManager.moveAllEnemy(this.player.bulletArray,this.canvasStyle,this.ctx);

        if (this.flag) {
            requestAnimationFrame(() => this.update());
        }
    }

    gameStart() {
        this.flag = true;
        this.update();
    }

    gameStop() {
        this.flag = false;
    }
}