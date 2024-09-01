class mainView{
    constructor(){
        this.home = document.getElementById('home');
        
        // ボタンを取得し、クリックイベントをバインド
        this.startButton = document.getElementById('start');
        this.optionButton = document.getElementById('optionButtom');
        this.helpButton = document.getElementById('helpButton');

        this.startButton.addEventListener('click',()=>this.onClickButton('start'));
        this.optionButton.addEventListener('click',()=>this.onClickButton('option'));
        this.helpButton.addEventListener('click',()=>this.onClickButton('help'));

        this.option = document.getElementById('option');

        this.text = document.getElementById('hedder-text');

        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');

        document.addEventListener('keydown', (e) => this.handleEscapeKey(e));

        this.situation = 'home';

        this.audioManager = new AudioManager();

        this.gameview = new gameView(this.canvas,this.ctx,this,this.audioManager);

        this.result = document.getElementById('result');
        this.result.style.display = 'none';

        this.helpView = document.getElementById('help');
        this.helpView.style.display = 'none';
    }

    switchView(NextSituation){
        if (NextSituation===this.situation) {
            return;
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
                break;
            case 'pause':
                home.style.display = 'none'
                break;
            case 'help':
                this.helpView.style.display = 'none'
                break;
            default:
                break;
        }
        switch (NextSituation) {
            case 'home':
                home.style.display = 'grid'
                this.text.innerHTML = 'title';
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
            case 'pause':
                home.style.display = 'grid'
                this.text.innerHTML = 'pause';
                break;
            case 'help':
                this.helpView.style.display = 'inline'
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
        } else if (action === 'help') {
            this.switchView('help')
        }
    }

    handleEscapeKey(event){
        if (event.key==='Escape') {
            this.switchView('pause');
        }
    }

    setVolume(volume){
        this.audioManager.setVolume(volume/100);
    }

    setSEVolume(volume){
        this.audioManager.setSEVolume(volume/100);
    }

    popHome(){
        if (this.text.innerHTML==='pause') {
            this.switchView('pause');
        }else{
            this.switchView('home');
        }
    }
}