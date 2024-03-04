class welcomeScene extends Phaser.Scene {
    
    constructor () {
        super ({key: 'welcomeScene'})
    }

    preload() {
        this.load.image ('background1', 'assets/backgroundStart.png'); //load do background
        this.load.spritesheet ('botaoStart', 'assets/spritesheetBotaoStart.png', {startFrame: 0, endFrame: 1, frameWidth: 201, frameHeight: 59}); // load do botão
    }

    create() {
        this.background = this.add.image (400, 300, 'background1'); // cria o background
        this.botao = this.add.sprite (400, 427, 'botaoStart'); // cria o botão
        this.botao.setInteractive(); // define o botão como um elemento interativo

        this.botao.on('pointerover', () => { // ao passar o mouse sobre o botão
          this.botao.setFrame(1); // o frame 1 é mostrado
        });
        this.botao.on('pointerout', () => { // ao tirar o mouse do botão
            this.botao.setFrame(0); // o frame 0 é mostrado
        })
        this.botao.on('pointerdown', this.mudarCena, this) // ao clicar no botão, o método mudarCena é chamado

    }

    mudarCena () { // inicia a cena do level1
        this.scene.start('level1');
    }

    update() {
        
    }
}
