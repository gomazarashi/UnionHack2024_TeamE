class mainView{
    constructor(){
        this.home = document.getElementById('home');
        
        // ボタンを取得し、クリックイベントをバインド
        this.startButton = document.getElementById('start');
        this.optionButton = document.getElementById('optionButtom');

        this.startButton.addEventListener('click',()=>this.onClickButton('start'));
        this.optionButton.addEventListener('click',()=>this.onClickButton('option'));

        this.option = document.getElementById('option');

        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');

        document.addEventListener('keydown', (e) => this.handleEscapeKey(e));

        this.situation = 'home';

        this.audioManager = new AudioManager();

        this.gameview = new gameView(this.canvas,this.ctx,this,this.audioManager);

        this.result = document.getElementById('result');
        this.result.style.display = 'none';
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
            case 'result':
                this.result.style.display = 'none';
                break; 
            case 'option':
                this.option.style.display = 'none';
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
            case 'result':
                this.result.style.display = 'inline'
                break;
            case 'option':
                this.option.style.display = 'grid'
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
            this.switchView('option')
        }
    }

    handleEscapeKey(event){
        if (event.key==='Escape') {
            this.switchView('home');
        }
    }

    setVolume(volume){
        this.audioManager.setVolume(volume/100);
    }
}