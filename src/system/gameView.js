const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const player = new playerControl()

const canvasStyle = new CanvasStyle(canvas);

function update(){
    ctx.clearRect(0,0,640,480);

    canvasStyle.drawBackground(); // 背景の描画
    canvasStyle.drawGameScreen(0, 3); // スコアとライフの表示

    // アイテムメニューの表示
    const items = ['Item 1', 'Item 2', 'Item 3'];
    canvasStyle.drawItemMenu(items);

    player.movePlayer();
    player.drawPlayer(ctx);
    player.bulletControl(ctx);

    requestAnimationFrame(update);
}

update();