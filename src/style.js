class CanvasStyle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        // デバイスピクセル比率に基づいてキャンバスの解像度を設定 ここを設定しないと文字がぼやける
        this.dpr = window.devicePixelRatio || 1;

        // CSSでの表示サイズ（論理サイズ）
        this.canvas.style.width = '640px';
        this.canvas.style.height = '480px';

        // 実際のキャンバスサイズ（物理ピクセル）
        this.canvas.width = 640 * this.dpr;
        this.canvas.height = 480 * this.dpr;

        // スケーリング
        this.ctx.scale(this.dpr, this.dpr);
    }

    drawBackground(color = '#111') {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.canvas.width / this.dpr, this.canvas.height / this.dpr);
    }

    drawGameScreen(score, lives) {
        this.ctx.font = '20px Arial';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`SCORE: ${score}`, 10, 30); // スコアの表示
        this.ctx.fillText(`LIFE: ${lives}`, (this.canvas.width / this.dpr) - 100, 30); // ライフの表示
    }

    drawItemMenu(items) {
        const menuWidth = 150;
        const menuHeight = 100;
        const menuX = 10;
        const menuY = (this.canvas.height / this.dpr) - menuHeight - 10;
        
        this.ctx.fillStyle = 'rgba(50, 50, 50, 0.8)';
        this.ctx.fillRect(menuX, menuY, menuWidth, menuHeight);

        this.ctx.font = '16px Arial';
        this.ctx.fillStyle = 'white';
        items.forEach((item, index) => {
            this.ctx.fillText(item, menuX + 10, menuY + 25 + (index * 20));
        });
    }
}

// インスタンスの生成と画面表示
const canvasStyle = new CanvasStyle(canvas);
canvasStyle.drawBackground(); // 背景の描画
canvasStyle.drawGameScreen(0, 3); // スコアとライフの表示

// アイテムメニューの表示
const items = ['Item 1', 'Item 2', 'Item 3'];
canvasStyle.drawItemMenu(items);
