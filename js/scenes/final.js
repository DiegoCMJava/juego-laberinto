class Final extends Phaser.Scene {

    constructor() {
        super('Final');
    };

    init() {
        console.log("Final");
    };

    preload() {
        this.load.path = './assets/';
        this.load.image('bgfinal', 'img/bgfinal.jpg');
        this.load.text('fintext', 'texts/fin.txt');
        this.load.text('fintext2', 'texts/fin2.txt');
    };

    create() {
        this.cursors = this.input.keyboard.createCursorKeys();

        this.bgfinal = this.add.image(500, 350, 'bgfinal');

        const fintext = this.cache.text.get('fintext');
        const fintext2 = this.cache.text.get('fintext2');
        this.add.dom(400, 300, "div", 'width: 600px; height: 500px; font: 24px Copperplate Gothic; color: white; overflow: hidden', fintext);
        this.add.dom(400, 890, "div", 'width: 600px; height: 500px; font: 24px Copperplate Gothic; color: yellow; overflow: hidden', fintext2);
    };

    update(time, delta) {
        if (this.input.keyboard.checkDown(this.cursors.space, 250)) {
            this.scene.start('Intro');
        }
    }

};
export default Final;