class level1 extends Phaser.Scene {

    pulando = false
    
    constructor () {
        super ({key: 'level1'})
    }

    preload() {
        this.load.image ('background2', 'assets/backgroundLevel1.png');
        this.load.spritesheet ('personagem', 'assets/spritesheetPersonagem.png', {startFrame:0, endFrame: 15, frameWidth:32, frameHeight:48});
        this.load.image ('plataforma', 'assets/plataforma.png');
        this.load.image ('chao', 'assets/chão.png')
        this.load.image ('flor', 'assets/florPontuação.webp');
    }

    create() {

        this.pontuacao = 0

        this.cameras.main.fadeIn(1000, 0, 0, 0); 

        this.background = this.add.image (400, 300, 'background2');

        this.personagem = this.physics.add.sprite (0,0,'personagem').setScale(1.5);

        this.personagem.setCollideWorldBounds(true);

        this.chao = this.physics.add.staticImage (400, 600, 'chao');
        this.physics.add.collider(this.personagem, this.chao);

        this.teclado = this.input.keyboard.createCursorKeys();

        // Plataforma

        this.plataforma = this.physics.add.staticImage(400, 200, 'plataforma'); 
        this.physics.add.collider(this.personagem, this.plataforma);

        this.plataforma = this.physics.add.staticImage(250, 480, 'plataforma');
        this.physics.add.collider(this.personagem, this.plataforma);

        this.plataforma = this.physics.add.staticImage(500, 420, 'plataforma');
        this.physics.add.collider(this.personagem, this.plataforma);

        this.plataforma = this.physics.add.staticImage(100, 300, 'plataforma');
        this.physics.add.collider(this.personagem, this.plataforma);

        this.plataforma = this.physics.add.staticImage(760, 370, 'plataforma');
        this.physics.add.collider(this.personagem, this.plataforma);

        this.plataforma = this.physics.add.staticImage(600, 310, 'plataforma');
        this.physics.add.collider(this.personagem, this.plataforma);


        // Placar
        this.placar = this.add.text(50, 50, 'Flores:' + this.pontuacao, {fontSize:'45px', fill:'#495613'});

        // Flor        
        this.flor = this.physics.add.sprite(20, 50 ,'flor').setScale(0.025); // adiciona a flor na tela
            this.flor.setCollideWorldBounds(true); // ativa os limites de mundo para a flor
            this.flor.setBounce (0.4); // ativa o bounce da flor
            this.physics.add.collider(this.flor, this.plataforma); // ativa a colisão entre a flor e as plataformas

        this.physics.add.overlap(this.personagem, this.flor, () => { // overlap entre a personagem e a flor
            this.flor.setVisible (false); // a flor fica invisível

            this.flor.y = Phaser.Math.RND.between (0,200); //posição vertical aleatória
            this.flor.x = Phaser.Math.RND.between (50,650); //posição horizontal aleatória

            this.pontuacao += 1; // o número de pontos na variável pontuação crescerá em 1

            this.placar.setText ('Flores:' + this.pontuacao); // o texto do placar será atualizado com a nova quantidade de flores

            this.flor.setVisible (true); // a flor fica visível de novo
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

