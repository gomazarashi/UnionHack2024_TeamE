const enemyView = document.getElementById('enemy');
const enemyCtx = enemyView.getContext('2d');

enemyCtx.fillStyle = 'red';
enemyCtx.fillRect(0, 0, 20, 20);
enemyCtx.fillStyle = 'blue';
enemyCtx.fillRect(30, 0, 20, 20);
enemyCtx.fillStyle = 'green';
enemyCtx.fillRect(60, 0, 40, 40);

const itemView = document.getElementById('item');
const itemCtx = itemView.getContext('2d');

itemCtx.fillStyle = 'rgb(255, 165, 0)'; // オレンジ色
itemCtx.beginPath();
itemCtx.arc(10, 10, 10, 0, Math.PI * 2);
itemCtx.fill();
itemCtx.fillStyle = 'rgb(0, 0, 255)'; // 青色
itemCtx.beginPath();
itemCtx.arc(35, 10, 10, 0, Math.PI * 2);
itemCtx.fill();
itemCtx.fillStyle = 'rgb(0, 128, 0)'; // 緑色
itemCtx.beginPath();
itemCtx.arc(60, 10, 10, 0, Math.PI * 2);
itemCtx.fill();

const bossView = document.getElementById('boss');
const bossCtx = bossView.getContext('2d');

bossCtx.fillStyle = "red";
bossCtx.beginPath();
bossCtx.arc(40, 40, 80 / 2, 0, 2 * Math.PI);
bossCtx.fill();

bossCtx.fillStyle = "white";
bossCtx.beginPath();
bossCtx.moveTo(40 - 80 / 2, 40);
bossCtx.lineTo(40, 40 - 60 / 2);
bossCtx.lineTo(40 + 80 / 2, 40);
bossCtx.lineTo(40, 40 + 60 / 2);
bossCtx.closePath();
bossCtx.fill();

document.addEventListener('contextmenu', function(e) {
    e.preventDefault(); // 右クリックメニューを無効化
});

document.addEventListener('copy', function(e) {
    e.preventDefault(); // コピー操作を無効化
});

document.addEventListener('selectstart', function(e) {
    e.preventDefault(); // テキスト選択を無効化
});