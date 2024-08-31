document.addEventListener('contextmenu', function(e) {
    e.preventDefault(); // 右クリックメニューを無効化
});

document.addEventListener('copy', function(e) {
    e.preventDefault(); // コピー操作を無効化
});

document.addEventListener('selectstart', function(e) {
    e.preventDefault(); // テキスト選択を無効化
});