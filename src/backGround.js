const sparkles = document.querySelector('.sparkles');
        
function addSparkle() {
    const top = (Math.random() * 100) + '%';
    const left = (Math.random() * 100) + '%';
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.top = top;
    sparkle.style.left = left;
    sparkles.appendChild(sparkle);
    
    // 一定時間後に再度キラキラを追加
    setTimeout(addSparkle, Math.random() * 1000);
    
    // 3秒後にこのキラキラを削除
    setTimeout(() => {
        sparkle.remove();
    }, Math.random()*3000);
}

// 初期のキラキラを開始
for (let i = 0; i < 20; i++) {
    addSparkle();
}