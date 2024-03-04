class welcomeScene extends Phaser.Scene {
    
    constructor () {
        super ({key: 'welcomeScene'})
    }

    preload() {
        this.load.image ('background1', 'assets/backgroundStart.png');
        this.load.spritesheet ('botaoStart', 'assets/spritesheetBotaoStart.png', {startFrame: 0, endFrame: 1, frameWidth: 201, frameHeight: 59});
    }

    create() {
        this.background = this.add.image (400, 300, 'background1');
        this.botao = this.add.sprite (400, 427, 'botaoStart');
        this.botao.setInteractive();

        this.botao.on('pointerover', () => {
          this.botao.setFrame(1);
        });
        this.botao.on('pointerout', () => {
            this.botao.setFrame(0);
        })
        this.botao.on('pointerdown', this.mudarCena, this)

    }

    mudarCena () {
        this.scene.start('level1');
    }

    update() {
        
    }
}
