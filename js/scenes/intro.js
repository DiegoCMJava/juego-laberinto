class Intro extends Phaser.Scene {

    constructor(){
        super('Intro');
    };

    init(){
        console.log("Intro");
    };

    preload(){
        this.load.path = './assets/';
        this.load.image('bgintro', 'img/bgintro.jpg');
        this.load.text('introtext', 'texts/intro.txt');
        this.load.text('introtext2', 'texts/intro2.txt');
        this.load.audio('bgsound', ['sound/bgsound.mp3', 'sound/bgsound1.ogg'])
    };

    create(){
        this.cursors = this.input.keyboard.createCursorKeys();

        const introtext = this.cache.text.get('introtext');
        const introtext2 = this.cache.text.get('introtext2');
       this.add.dom(400, 300, "div",  'width: 600px; height: 500px; font: 24px Copperplate Gothic; color: white; overflow: hidden', introtext);
       this.add.dom(400, 890, "div",  'width: 600px; height: 500px; font: 24px Copperplate Gothic; color: yellow; overflow: hidden', introtext2);
       this.bgintro = this.add.image(500, 350, 'bgintro');

       const loopMarker = {
        name: 'loop',
       // start: 0,
       // duration: 7.68,
        config: {
            loop: true
        }
    };

       const bgsound = this.sound.add('bgsound');
       bgsound.addMarker(loopMarker)
       bgsound.play('loop');
    };

    update(time, delta) {
        if (this.input.keyboard.checkDown(this.cursors.space, 250)) {
            this.scene.start('Game');
        }
    }

};
export default Intro;