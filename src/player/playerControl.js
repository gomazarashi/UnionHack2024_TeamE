class PlayerControl {
    constructor() {
        this.speed = 3;
        this.positionX = 320;
        this.positionY = 400;

        this.controler = {
            a: false,
            s: false,
            d: false,
            w: false,
            Space: -1,
        };
        window.addEventListener("keydown", this.handleKeyPress.bind(this));
        window.addEventListener("keyup", this.handleKeyRelease.bind(this));

        this.bulletArray = new Array();
        this.bulletType = 'single'; // 弾の種類を管理するプロパティ

        this.tripleBulletCounter = 0;
    }

    drawPlayer(ctx) {
        ctx.strokeStyle = "white";
        ctx.strokeRect(this.positionX - 15, this.positionY - 10, 30, 20);
        ctx.strokeRect(this.positionX - 5, this.positionY - 20, 10, 10);
    }

    fillDraw(ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(this.positionX - 15, this.positionY - 10, 30, 20);
        ctx.fillRect(this.positionX - 5, this.positionY - 20, 10, 10);
    }

    movePlayer() {
        if (this.controler.w && this.controler.a) {
            this.positionY -= (this.speed / Math.sqrt(2));
            this.positionX -= (this.speed / Math.sqrt(2));
        } else if (this.controler.w && this.controler.d) {
            this.positionY -= (this.speed / Math.sqrt(2));
            this.positionX += (this.speed / Math.sqrt(2));
        } else if (this.controler.s && this.controler.a) {
            this.positionY += (this.speed / Math.sqrt(2));
            this.positionX -= (this.speed / Math.sqrt(2));
        } else if (this.controler.s && this.controler.d) {
            this.positionY += (this.speed / Math.sqrt(2));
            this.positionX += (this.speed / Math.sqrt(2));
        } else if (this.controler.w) {
            this.positionY -= this.speed;
        } else if (this.controler.s) {
            this.positionY += this.speed;
        } else if (this.controler.a) {
            this.positionX -= this.speed;
        } else if (this.controler.d) {
            this.positionX += this.speed;
        }

        if (this.controler.Space) {
            this.addBullet();
            this.controler.Space = 0;
        }

        //画面端の指定
        if (this.positionX < 0) {
            this.positionX = 0;
        }
        if (this.positionX > 640) {
            this.positionX = 640;
        }
        if (this.positionY < 0) {
            this.positionY = 0;
        }
        if (this.positionY > 480) {
            this.positionY = 480;
        }

        this.tripleBulletCounter--;
    }

    addBullet() {
        // if (this.bulletType === 'single') {
        //     // 単方向の弾を発射
        //     this.bulletArray.push(new PlayerBullet(this.positionX, this.positionY));
        // } else if (this.bulletType === 'triple') {
        //     // 3方向の弾を発射
        //     this.bulletArray.push(new PlayerBullet(this.positionX, this.positionY, -2, -5)); // 左斜め上
        //     this.bulletArray.push(new PlayerBullet(this.positionX, this.positionY, 0, -5));  // 真上
        //     this.bulletArray.push(new PlayerBullet(this.positionX, this.positionY, 2, -5));  // 右斜め上
        // }
        if (this.tripleBulletCounter<=0) {
            // 単方向の弾を発射
            this.bulletArray.push(new PlayerBullet(this.positionX, this.positionY));
        }else{
            this.bulletArray.push(new PlayerBullet(this.positionX, this.positionY, -2, -5)); // 左斜め上
            this.bulletArray.push(new PlayerBullet(this.positionX, this.positionY, 0, -5));  // 真上
            this.bulletArray.push(new PlayerBullet(this.positionX, this.positionY, 2, -5));  // 右斜め上
        }
    }

    bulletControl(ctx) {
        this.bulletArray = this.bulletArray.filter(bullet => bullet.getExistence());
        this.bulletArray.forEach(bullet => {
            bullet.moveBullet();
            bullet.drawBullet(ctx);
        })
    }

    handleKeyPress(event) {
        switch (event.key) {
            case "a":
                this.controler.a = true;
                break;
            case "s":
                this.controler.s = true;
                break;
            case "d":
                this.controler.d = true;
                break;
            case "w":
                this.controler.w = true;
                break;
            case " ":
                if (this.controler.Space === -1) {
                    this.controler.Space = 1;
                }
                break;
        }
    }

    handleKeyRelease(event) {
        switch (event.key) {
            case "a":
                this.controler.a = false;
                break;
            case "s":
                this.controler.s = false;
                break;
            case "d":
                this.controler.d = false;
                break;
            case "w":
                this.controler.w = false;
                break;
            case " ":
                this.controler.Space = -1;
                break;
        }
    }

    // プレイヤーのスピードを上げる
    speedUp() {
        console.log('speedUp');
        this.maxSpeed = 6;
        if (this.speed <= this.maxSpeed) {
            this.speed += 1;
        }
    }

    // アイテムを取得したときに弾の種類を変更する
    changeBulletType(type) {
        this.bulletType = type;
        this.tripleBulletCounter = 300;
    }

}
