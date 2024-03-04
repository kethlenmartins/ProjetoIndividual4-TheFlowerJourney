class level1 extends Phaser.Scene {
    
    pulando = false;
    pontuacao = 0;
    
    constructor () {
        super ({key: 'level1'})
    }



    preload() {
        this.load.image ('background2', 'assets/backgroundLevel1.png');
        this.load.spritesheet ('personagem', 'assets/spritesheetPersonagem.png', {startFrame:0, endFrame: 15, frameWidth:32, frameHeight:48});
        this.load.image ('plataforma', 'assets/plataforma.png');
        this.load.image ('chao', 'assets/chão.png')
    }

    create() {

        this.cameras.main.fadeIn(1000, 0, 0, 0); 

        this.background = this.add.image (400, 300, 'background2');

        this.personagem = this.physics.add.sprite (0,0,'personagem').setScale(1.5);

        this.personagem.setCollideWorldBounds(true);

        this.chao = this.physics.add.staticImage (400, 600, 'chao');
        this.physics.add.collider(this.personagem, this.chao);

        this.teclado = this.input.keyboard.createCursorKeys();

        this.plataforma = this.physics.add.staticImage(400, 200, 'plataforma'); 
        this.physics.add.collider(this.personagem, this.plataforma);

        this.plataforma = this.physics.add.staticImage(250, 500, 'plataforma'); // cria a imagem da primeira platforma na tela do jogo como elemento estático que é afetado pela física
        this.physics.add.collider(this.personagem, this.plataforma);

        this.placar = this.add.text(50, 50, 'Flores:' + pontuacao, {fontSize:'45px', fill:'#495613'}); // adiciona na tela o texto base do placar

        this.flor = this.physics.add.sprite(larguraJogo/2 ,0 ,'flor'); // cria a moeda na tela do jogo
            moeda.setCollideWorldBounds(true); // ativa os limites do canva para a moeda e a impede de sair da tela
            moeda.setBounce (0.7); //
            this.physics.add.collider(moeda, plataforma);

            this.physics.add.overlap (alien, moeda, function() { // sempre que o alien tiver a mesma posição que a moeda (passar por cima dela), a função abaixo será chamada

                moeda.setVisible (false); // a moeda ficará invisível
                moeda.setDepth (1); // faz com que a moeda seja renderizada sobre outros elementos do código e não atravesse as plataformas

                moeda.y = Phaser.Math.RND.between (50,650); // uma nova posição vertical para a moeda será escolhida aleatoriamente -> foi necessário tirar a variável posiçãoMoeda_Y, pois o código não rodava com ela
                moeda.x = Phaser.Math.RND.between (50,650); // uma nova posição horizontal vai ser escolhida

                pontuacao += 1; // o número de pontos na variável pontuação crescerá em 1

                placar.setText ('Moedas:' + pontuacao); // o texto do placar será atualizado com a nova pontuação

                moeda.setVisible (true);

            });

        this.anims.create ({
            key:'andarDireita',
            frames: this.anims.generateFrameNumbers('personagem', { start: 8, end: 11 }),
            frameRate: 8, 
            repeat: -1,
        })

        this.anims.create ({
            key:'andarEsquerda',
            frames: this.anims.generateFrameNumbers('personagem', { start: 4, end: 7 }),
            frameRate: 8, 
            repeat: -1,
        })

    }

    update() {    
        
        if (this.teclado.left.isDown) {
            this.personagem.anims.play ('andarEsquerda', true);
            this.personagem.setVelocityX(-250); 
    }

        else if (this.teclado.right.isDown) { 
            this.personagem.anims.play ('andarDireita', true);
            this.personagem.setVelocityX(250);
    }

        else {
            this.personagem.setFrame(0);
            this.personagem.setVelocityX(0);
    }

        if (this.teclado.up.isDown && this.pulando == false) {
        this.personagem.setVelocityY(-250);
        this.pulando = true;
    }

        else { 
    }

    if (this.personagem.body.touching.down) {
        this.pulando = false;
    }
        
    }
}