//create a game phaser class
export class Game extends Phaser.Scene {
    constructor() {
    super({ key: "game" });
    }

    init () {
        this.level = 1;
        this.score = 0;
    }

    preload () {
        this.load.image ("ball", "./assets/images/ball.png");
        this.load.image ("platform", "./assets/images/platform.png");
        this.load.image ("obstacle", "./assets/images/obstacle.png");
    }

    create () {
        this.physics.world.setBoundsCollision (true, true, true, false);
        this.platform =this.physics.add.sprite (400, 500, "platform").setImmovable().setScale(0.7);
        this.platform.body.allowGravity = false;
        this.platform.setCollideWorldBounds(true);

        this.ball =  this.physics.add.sprite (200, 0, "ball");
        this.ball.setScale(0.5);
        this.ball.setBounce(1);
        this.ball.setCollideWorldBounds(true);
        this.ballVelocity = 220;
        this.ball.setVelocity(this.ballVelocity, this.ballVelocity);

        this.obstacle = this.physics.add.staticGroup ();

        this.platformVelocity = 500

        //collider between ball and platform
        this.physics.add.collider(
            this.platform,
            this.ball,
            this.bounce,
            null,
            this
        )

        this.physics.add.collider(
            this.obstacle,
            this.ball
            );

        this.cursors = this.input.keyboard.createCursorKeys();

        this.scoreText = this.add.text (16, 16, "Score: 0", { fontSize: '20px', fill: '#fff' });
        this.levelText = this.add.text(16, 40, "Level: 1", { fontSize: '20px', fill: '#fff' })
    }


    bounce (ball, platform) {
    this.score ++;
    this.scoreText.setText ("score: " + this.score);

}

generateRandomDarkColor() {
    const minSaturation = 0.5; // Saturación mínima
    const maxSaturation = 1; // Saturación máxima
    const minBrightness = 0.1; // Brillo mínimo
    const maxBrightness = 0.5; // Brillo máximo
    
    // Generar un color aleatorio en formato HSV
    const randomColor = Phaser.Display.Color.HSVToRGB(
        Math.random(), // Tono (Hue)
        Phaser.Math.FloatBetween(minSaturation, maxSaturation), // Saturación
        Phaser.Math.FloatBetween(minBrightness, maxBrightness) // Brillo
    );

    return randomColor.color;
}

nextLevel() {
    this.level++;
    this.levelText.setText("level: " + this.level);

    this.ballVelocity = this.ballVelocity * 1.1;

    // Reiniciar elementos del juego
    this.platform.setPosition(400, 500);
    this.ball.setPosition(200, 0);
    this.ball.setVelocity(this.ballVelocity, this.ballVelocity);
    this.score = 0;
    this.scoreText.setText("score: " + this.score);

    let randomObstaclex = Phaser.Math.Between(30, 750);
    let randomObstacley = Phaser.Math.Between(20, 280);
    

    this.platformVelocity * 1.1;

    this.obstacle.create(randomObstaclex, randomObstacley, "obstacle").setScale(1.2).refreshBody();

    // Generar un color aleatorio oscuro
    const randomDarkColor = this.generateRandomDarkColor();

    // Cambiar el color de fondo de la escena
    this.cameras.main.setBackgroundColor(randomDarkColor);


    if (this.level >= 20) {
        this.showWinMessage();
    }
}

showWinMessage() {
    this.add.text(400, 300, "¡Has ganado!", {
        fontSize: '48px',
        fill: '#ffffff',
        align: 'center'
    }).setOrigin(0.5);
    this.ball.disableBody(true, true);
    this.platform.disableBody(true, true);
    this.obstacle.disableBody(true, true);
}

showLoseMessage () {
    this.add.text(400, 300, "¡Has perdido!", {
        fontSize: '48px',
        fill: '#ffffff',
        align: 'center'
    }).setOrigin(0.5);
    this.ball.disableBody(true, true);
    this.platform.disableBody(true, true);
}


    update() {
    if (this.cursors.left.isDown) {
        this.platform.setVelocityX(-this.platformVelocity);
    } else if (this.cursors.right.isDown) {
        this.platform.setVelocityX(this.platformVelocity);
    } else {
        this.platform.setVelocityX(0);
    }

   /*  if (this.cursors.up.isDown) {
        this.platform.setVelocityY(-this.platformVelocity);
    } else if (this.cursors.down.isDown) {
        this.platform.setVelocityY(this.platformVelocity);
    } else {
        this.platform.setVelocityY(0);
    } */

    if (this.score >= 10) {
        this.nextLevel();
    }

    if (this.ball.y > 550) {
        this.showLoseMessage();
    }
}

}