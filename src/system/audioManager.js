class AudioManager {
    constructor() {
        // BGMの設定
        this.bgm = new Audio('./resources/sound/maou_bgm_cyber43.mp3');
        this.bgm.loop = true; // ループ再生を有効にする
        this.bgm.volume = 0.2; // 音量を設定（0.0から1.0の範囲）

        this.SE = {
            damage:new Audio('./resources/sound/takeDamage.mp3'),
            speedUp:new Audio('./resources/sound/speedUp.mp3'),
            powerUp:new Audio('./resources/sound/powerUp.mp3'),
            heal:new Audio('./resources/sound/heal.mp3'),
        }
        Object.values(this.SE).forEach(se => {
            se.volume = 1;
        });
    }

    // BGMの再生
    playBGM() {
        this.bgm.play();
    }

    // BGMの停止
    stopBGM() {
        this.bgm.pause();
        this.bgm.currentTime = 0; // 再生位置をリセット
    }

    // BGMの一時停止
    pauseBGM() {
        this.bgm.pause();
    }

    // BGMの音量設定
    setVolume(volume) {
        this.bgm.volume = volume;
    }

    // BGMの再生
    playSE(type) {
        this.SE[type].play();
    }

    // BGMの音量設定
    setSEVolume(volume) {
        Object.values(this.SE).forEach(se => {
            se.volume = volume;
        });
    }
}