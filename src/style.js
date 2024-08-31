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

        // スコアとライフの初期化　表示のために設定しているが、後ほどゲーム管理用のjsファイルに移動する
        this.score = 0;
        this.lives = 5;
    }

    drawBackground(color = '#111') {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.canvas.width / this.dpr, this.canvas.height / this.dpr);
    }

    drawGameScreen() {
        this.ctx.font = '20px Arial';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`SCORE: ${this.score}`, 10, 30); // スコアの表示
        this.ctx.fillText(`LIFE: ${this.lives}`, (this.canvas.width / this.dpr) - 100, 30); // ライフの表示
    }


    // ライフを増やすメソッド
    increaseLife() {
        this.lives += 1;
    }

    // ライフを減らすメソッド
    decreaseLife() {
        this.lives -= 1;
    }

    // ライフをリセットするメソッド
    resetLives() {
        this.lives = 3;
    }

    // スコアを加算するメソッド
    addScore(points) {
        this.score += points;
    }

    // スコアをリセットするメソッド
    resetScore() {
        this.score = 0;
    }

    // スコアとライフを取得するメソッド
    getScoreAndLives() {
        return {
            score: this.score,
            lives: this.lives,
        };
    }

    setResultScore() {
        document.getElementById('score').innerText = this.score.toString();
    }
}

/* 
// インスタンスの生成と画面表示
const canvasStyle = new CanvasStyle(canvas);
canvasStyle.drawBackground(); // 背景の描画
canvasStyle.drawGameScreen(); // スコアとライフの表示

*/
