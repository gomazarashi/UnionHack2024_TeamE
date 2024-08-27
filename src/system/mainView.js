class mainView{
    constructor(){
        this.home = document.getElementById('home');
        
        // ボタンを取得し、クリックイベントをバインド
        this.startButton = document.getElementById('start');
        this.optionButton = document.getElementById('option');

        this.startButton.addEventListener('click',()=>this.onClickButton('start'));
        this.optionButton.addEventListener('click',()=>this.onClickButton('option'));

        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');

        document.addEventListener('keydown', (e) => this.handleEscapeKey(e));

        this.situation = 'home';

        this.gameview = new gameView(this.canvas,this.ctx);

    }

    switchView(NextSituation){
        if (NextSituation===this.situation) {
            return;
        }
        if (this.situation === 'home') {
            home.style.display = 'none'
        }
        switch (this.situation) {
            case 'home':
                home.style.display = 'none'
                break;
            case 'game':
                this.canvas.style.display = 'none'
                this.gameview.gameStop();
                break;        
            default:
                break;
        }
        switch (NextSituation) {
            case 'home':
                home.style.display = 'grid'
                break;
            case 'game':
                this.canvas.style.display = 'flex'
                this.gameview.gameStart()
                break;
            default:
                break;
        }
        this.situation = NextSituation;
    }
    onClickButton(action) {
        if (action === 'start') {
            this.switchView('game');
        } else if (action === 'option') {
            console.log('option');
        }
    }
    handleEscapeKey(event){
        console.log('test');
        if (event.key==='Escape') {
            this.switchView('home');
        }
    }
}