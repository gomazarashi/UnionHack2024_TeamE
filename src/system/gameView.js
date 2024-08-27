class gameView{
    constructor(canvas,ctx){
        this.ctx = ctx;

        this.player = new playerControl()
        this.canvasStyle = new CanvasStyle(canvas,ctx);
        this.flag = false;

        //this.enemy = new Enemy(10,10);
    }

    update(){
        this.ctx.clearRect(0,0,640,480);

        this.canvasStyle.drawBackground(); // 背景の描画
        this.canvasStyle.drawGameScreen(0, 3); // スコアとライフの表示

        // アイテムメニューの表示
        const items = ['Item 1', 'Item 2', 'Item 3'];
        this.canvasStyle.drawItemMenu(items);

        this.player.movePlayer();
        this.player.drawPlayer(this.ctx);
        this.player.bulletControl(this.ctx);

        // this.enemy.moveEnemy();
        // this.enemy.drawEnemy(this.ctx);

        if (this.flag) {
            requestAnimationFrame(()=>this.update());
        }
    }

    gameStart(){
        this.flag = true;
        this.update();
    }

    gameStop(){
        this.flag = false;
    }
}