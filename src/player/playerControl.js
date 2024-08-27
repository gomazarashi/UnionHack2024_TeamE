class playerControl {
    constructor() {
        this.speed = 3;
        this.positionX = 320;
        this.positionY = 400;
        
        this.controler = {
            a: false,
            s: false,
            d: false,
            w: false,
            Space: false
        };
        window.addEventListener("keydown", this.handleKeyPress.bind(this));
        window.addEventListener("keyup", this.handleKeyRelease.bind(this));

        this.bulletArray = new Array();
    }

    drawPlayer(ctx) {
        ctx.strokeStyle = "white";
        ctx.strokeRect(this.positionX - 15, this.positionY - 10, 30, 20);
        ctx.strokeRect(this.positionX - 5, this.positionY - 20, 10, 10)
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
            this.controler.Space=false;
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
    }

    addBullet(){
        this.bulletArray.push(new playerBullet(this.positionX,this.positionY));
    }

    bulletControl(ctx){
        this.bulletArray = this.bulletArray.filter(bullet=>bullet.getExistence());
        this.bulletArray.forEach(bullet=>{
            bullet.moveBullet();
            bullet.drawBullet(ctx);
        })
    }

    handleKeyPress(event) {
        console.log(event.key);
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
                this.controler.Space = true;
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
                this.controler.Space = true;
                break;
        }
    }
}
