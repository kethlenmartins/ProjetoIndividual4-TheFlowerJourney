class level1 extends Phaser.Scene {

    pulando = false
    
    constructor () {
        super ({key: 'level1'})
    }

    preload() {
        this.load.image ('background2', 'assets/backgroundLevel1.png'); // load do background
        this.load.spritesheet ('personagem', 'assets/spritesheetPersonagem.png', {startFrame:0, endFrame: 15, frameWidth:32, frameHeight:48}); // load da personagem
        this.load.image ('plataforma', 'assets/plataforma.png'); // load das plataformas
        this.load.image ('chao', 'assets/chão.png') // load do chão
        this.load.image ('flor', 'assets/florPontuação.webp'); // load da flor
    }

    create() {

        this.pontuacao = 0 // variável que guarda a pontuação

        this.cameras.main.fadeIn(1000, 0, 0, 0); // inicialização com efeito de fade in

        this.background = this.add.image (400, 300, 'background2'); // cria o background

        this.personagem = this.physics.add.sprite (0,1,'personagem').setScale(1.5); // cria a personagem
        this.personagem.setCollideWorldBounds(true); // define os limites de mundo para a personagem

        this.chao = this.physics.add.staticImage (400, 600, 'chao'); // cria o chão
        this.physics.add.collider(this.personagem, this.chao); // define as colisões entre a personagem e o chão

        this.teclado = this.input.keyboard.createCursorKeys(); // permite o controle através das teclas

        // Plataformas

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

        // flor
        this.floresGroup = this.physics.add.group(); // adiciona o grupo de elementos "flor"

        const numeroDeFlores = 100;

        for (let i = 0; i < numeroDeFlores; i++) {
            const novaFlor = this.physics.add.sprite(Phaser.Math.RND.between(50, 750), Phaser.Math.RND.between(50, 550), 'flor').setScale(0.025);
            novaFlor.setCollideWorldBounds(true); // define limites de mundo para as flores
            this.physics.add.collider(novaFlor, this.chao); // colisão entre flor e chão
            novaFlor.setBounce(0.7); // bounce das flores
            this.physics.add.collider(novaFlor, this.plataforma); // colisão entre flor e plataforma
        
            this.physics.add.overlap(this.personagem, novaFlor, () => { //overlap entre a personagem e as flores
                novaFlor.setVisible(false); // a flor fica invisível
                novaFlor.y = Phaser.Math.RND.between(50, 650); // nova posição vertical
                novaFlor.x = Phaser.Math.RND.between(50, 750); // nova posição horizontal
                this.pontuacao += 1; // soma-se 1 ao número de flores
                this.placar.setText('Flores:' + this.pontuacao); // atualização do placar
                novaFlor.setVisible(true); // a flor fica visível
            });
        
            // Adicione a nova flor ao grupo
            this.floresGroup.add(novaFlor);
        }

        // animações de movimento do personagem
        this.anims.create ({ // movimento para a direita
            key:'andarDireita',
            frames: this.anims.generateFrameNumbers('personagem', { start: 8, end: 11 }),
            frameRate: 8, 
            repeat: -1, // repetição em loop
        })

        this.anims.create ({ // movimento para a esquerda
            key:'andarEsquerda',
            frames: this.anims.generateFrameNumbers('personagem', { start: 4, end: 7 }),
            frameRate: 8, 
            repeat: -1, // repetição em loop
        })

    }

    update() { // controles com teclas de seta
        
        if (this.teclado.left.isDown) { // seta da esquerda pressionada
            this.personagem.anims.play ('andarEsquerda', true); // display na animação de movimento para a esquerda
            this.personagem.setVelocityX(-250); // movimento do personagem para a esquerda
    }

        else if (this.teclado.right.isDown) { // seta da direita pressionada
            this.personagem.anims.play ('andarDireita', true); // display na animação de movimento para a direita
            this.personagem.setVelocityX(250); // movimento do personagem para a direita
    }

        else { // nenhuma das teclas pressionadas
            this.personagem.setFrame(0); // frame 0 será mostrado
            this.personagem.setVelocityX(0); // a personagem não se move
    }

        if (this.teclado.up.isDown && this.pulando == false) { // seta para cima pressionada
            this.personagem.setVelocityY(-250); // movimento para cima
            this.pulando = true;
    }

        else { // a personagem cai pela ação da gravidade
    }

        if (this.personagem.body.touching.down) { // função de controle do pulo quando a personagem está no chão
            this.pulando = false;
    }
        
    }
}

