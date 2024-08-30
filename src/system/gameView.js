class gameView {
    constructor(canvas, ctx, mainview) {
        this.ctx = ctx;

        this.mainview = mainview;

        this.player = new playerControl()
        this.canvasStyle = new CanvasStyle(canvas, ctx);
        this.flag = false;

        this.enemyManager = new enemyFrequency(120, this);

        // 敵の弾を管理する配列
        this.enemyBullets = [];

        // BGMを管理するインスタンスを生成
        this.audioManager = new AudioManager();

        // アイテムを管理する配列
        this.items = [];

        // ボスが出現したかどうか
        this.bossSpawned = false;

        // ボスのインスタンス
        this.boss = new BossCharacter();

        // ボスの弾を管理する配列
        this.bossBullets = [];
    }

    update() {
        this.ctx.clearRect(0, 0, 640, 480);

        this.canvasStyle.drawBackground(); // 背景の描画
        this.canvasStyle.drawGameScreen(0, 3); // スコアとライフの表示

        if (this.canvasStyle.lives <= 0) {
            this.GameOver();
        }

        this.player.movePlayer();
        this.player.drawPlayer(this.ctx);
        // プレイヤーの弾の管理
        this.player.bulletControl(this.ctx);

        // 敵の弾の移動、描画、衝突判定
        this.manageEnemyBullets();

        this.enemyManager.management()
        this.enemyManager.moveAllEnemy(this.player.bulletArray, this.canvasStyle, this.ctx);

        // すべての敵が弾を発射する
        this.enemyManager.enemyList.forEach(enemy => {
            if (enemy && enemy.existence) {
                enemy.shoot(this.player); // 弾を発射させる
            }
        });

        // アイテムの管理
        this.manageItems();

        // ボスの出現をチェック
        this.checkForBossSpawn();

        if (this.boss && this.boss.getExistence()) {
            this.boss.moveBoss();
            this.boss.drawBoss(this.ctx);
            this.boss.moveBullets();

            // ボスの弾とプレイヤーの衝突判定
            this.boss.bullets = this.boss.bullets.filter(bullet => bullet.getExistence());
            this.boss.bullets.forEach(bullet => {
                if (bullet.checkCollisionWithPlayer(this.player)) {
                    this.canvasStyle.decreaseLife(); // プレイヤーのライフを減少
                    bullet.existence = false; // 弾を消す
                }
            });

            if (this.boss.checkCollisionWithPlayer(this.player)) {
                this.canvasStyle.decreaseLife(); // プレイヤーのライフを減少
            }
        }

        if (this.flag) {
            requestAnimationFrame(() => this.update());
        }
    }

    manageEnemyBullets() {
        // 敵の弾の存在をチェックして更新する
        this.enemyBullets = this.enemyBullets.filter(bullet => bullet.getExistence());
        this.enemyBullets.forEach(bullet => {
            bullet.moveBullet();
            bullet.drawBullet(this.ctx);

            // プレイヤーとの衝突判定
            if (bullet.checkCollisionWithPlayer(this.player)) {
                this.canvasStyle.decreaseLife(); // プレイヤーのライフを減少
                bullet.existence = false; // 弾を消す
                console.log('Player hit by enemy bullet!');
            }
        });
    }

    addEnemyBullet(bullet) {
        this.enemyBullets.push(bullet);
    }

    gameStart() {
        this.flag = true;
        this.audioManager.playBGM(); // ゲーム開始時にBGMを再生
        this.update();
    }

    gameStop() {
        this.flag = false;
        this.audioManager.stopBGM(); // ゲーム停止時にBGMを停止
    }

    addItem(item) {
        this.items.push(item); // 新しいアイテムを追加
    }

    manageItems() {
        // アイテムの描画と衝突処理
        this.items = this.items.filter((item) => item.existence); // 存在するアイテムだけを残す
        this.items.forEach((item) => {
            item.moveItem();
            item.drawItem(this.ctx);
            if (item.checkCollision(this.player)) {
                console.log('Item collected!');
                this.applyItemEffect(item.type);
                item.existence = false; // アイテムを消す

            }
        });
    }

    applyItemEffect(type) {
        if (type === 'playerSpeedUp') {
            this.player.speedUp(); // プレイヤーのスピードアップ
        } else if (type === 'changeBulletType') {
            this.player.changeBulletType('triple'); // プレイヤーの弾の種類を3方向に変更
        }
    }

    // ボスの出現判定を行うメソッド
    checkForBossSpawn() {
        this.score=this.canvasStyle.getScoreAndLives().score;
        console.log(this.score);
        if ((this.score >= 500) && (this.bossSpawned === false)) { // スコアが一定値を超えたらボスを出現させる
            this.spawnBoss();
        }
    }

    // ボスを出現させるメソッド
    spawnBoss() {
        // ボスキャラをインスタンス化
        this.bossSpawned = true;
        this.boss = new BossCharacter();
        this.boss.existence = true;
        //ボスを敵リストに追加
        this.enemyManager.enemyList.push(this.boss);
    }

    GameOver() {
        this.canvasStyle.setResultScore();
        this.canvasStyle.resetLives();
        this.canvasStyle.resetScore();
        this.player = new playerControl()
        this.flag = false;
        this.enemyManager = new enemyFrequency(120, this);
        // 敵の弾を管理する配列
        this.enemyBullets = [];
        this.mainview.switchView('result');
    }
}