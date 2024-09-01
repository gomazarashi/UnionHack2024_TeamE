class gameView {
    constructor(canvas, ctx, mainview, audioManager) {
        this.ctx = ctx;

        this.mainview = mainview;

        this.player = new PlayerControl()
        this.canvasStyle = new CanvasStyle(canvas, ctx);
        this.flag = false;

        this.enemyManager = new EnemyFrequency(120, this);

        // 敵の弾を管理する配列
        this.enemyBullets = [];

        // BGMを管理するインスタンスを生成
        this.audioManager = audioManager;

        // アイテムを管理する配列
        this.items = [];

        // ボスが出現したかどうか
        this.bossSpawned = false;

        // ボスの弾を管理する配列
        this.bossBullets = [];

        this.boss = new BossCharacter(this.ctx, this);

        this.bossCounter = 0;
        this.NextBossSpan = 800;

        // ボス周辺の敵機を格納する配列
        this.orbitingEnemies = [];
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

        // ボスの存在確認と弾の発射
        if (this.boss && this.boss.existence) {
            this.boss.shoot(); // ボスの弾を発射
        }

        if (this.boss && this.boss.getExistence()) {
            this.boss.moveBoss();
            this.boss.updateOrbitingEnemies(); // ボス周辺の敵機を更新
            this.boss.drawBoss(this.ctx);
            this.boss.moveBullets();

            //ボスの周辺の敵機の弾の発射処理
            this.boss.orbitingEnemies.forEach(enemy => {
                if (enemy && enemy.existence) {
                    enemy.shoot(); // 弾を発射させる
                }
            });

            this.player.bulletArray.forEach(bullet => {
                this.boss.orbitingEnemies.forEach(enemy => {
                    if (enemy && enemy.existence) {
                        if (enemy.checkCollision(bullet)) {
                            // console.log('Orbiting enemy hit!');
                            // 敵機が倒れたら何か処理が必要ならここで行う
                        }
                    }
                });
            });



            // ボスの弾とプレイヤーの衝突判定
            this.boss.bullets = this.boss.bullets.filter(bullet => bullet.getExistence());
            this.boss.bullets.forEach(bullet => {
                if (bullet.checkCollisionWithPlayer(this.player)) {
                    this.canvasStyle.decreaseLife(this.player); // プレイヤーのライフを減少
                    bullet.existence = false; // 弾を消す
                }
            });

            if (this.boss.checkCollisionWithPlayer(this.player)) {
                this.canvasStyle.decreaseLife(this.player); // プレイヤーのライフを減少
            }
        }

        // プレイヤーの弾とボスの衝突判定
        this.player.bulletArray.forEach(bullet => {
            if (bullet.getExistence() && this.boss.getExistence()) {
                if (this.boss.checkCollisionWithBullet(bullet)) {
                    this.boss.takeDamage(1); // 弾が当たったらダメージを受ける
                    bullet.existence = false; // 弾を消す
                    if (!this.boss.getExistence()) {
                        this.canvasStyle.addScore(5000+(25*this.bossCounter)); // ボスを倒したらスコアを加算
                        this.HandleBossDefeat();
                    }
                }
            }
        })

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
                this.canvasStyle.decreaseLife(this.player); // プレイヤーのライフを減少
                bullet.existence = false; // 弾を消す
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
                this.applyItemEffect(item.type);
                item.existence = false; // アイテムを消す

            }
        });
    }

    applyItemEffect(type) {
        if (type === 'speedUp') {
            this.player.speedUp(); // プレイヤーのスピードアップ
        } else if (type === 'changeBulletType') {
            this.player.changeBulletType('triple'); // プレイヤーの弾の種類を3方向に変更
        } else if (type === 'heal') {
            this.canvasStyle.increaseLife(); // プレイヤーのライフを回復
        }
    }

    // ボスの出現判定を行うメソッド
    checkForBossSpawn() {
        this.score = this.canvasStyle.getScoreAndLives().score;
        if ((this.score >= this.NextBossSpan) && (this.bossSpawned === false)) { // スコアが一定値を超えたらボスを出現させる
            this.spawnBoss();
        }
    }

    // ボスを出現させるメソッド
    spawnBoss() {
        // ボスキャラをインスタンス化
        this.bossSpawned = true;

        this.boss.hp = 20 + 10*this.bossCounter;

        this.boss.existence = true;
        this.boss.spawnOrbitingEnemies(this.bossCounter); // ボス周辺の敵機を生成
    }

    HandleBossDefeat() {
        this.bossCounter++;
        this.NextBossSpan = this.canvasStyle.getScoreAndLives().score + 500*Math.sqrt(this.bossCounter*2);
        this.bossSpawned = false;
        this.enemyManager.setIntervalFromCounter(this.bossCounter);
    }

    GameOver() {
        this.canvasStyle.setResultScore();
        this.canvasStyle.resetLives();
        this.canvasStyle.resetScore();
        this.player = new PlayerControl()
        this.flag = false;
        this.enemyManager = new EnemyFrequency(120, this);
        // 敵の弾を管理する配列
        this.enemyBullets = [];
        this.mainview.switchView('result');
        // ボスに関する変数を初期化
        this.bossSpawned = false;
        this.bossBullets = [];
        // 後から追加した変数の初期化
        this.bossCounter = 0;
        this.NextBossSpan = 800;
        this.boss = new BossCharacter(this.ctx, this);
        // アイテムの初期化
        this.items = [];
    }
}