class Game extends Phaser.Scene {

    constructor(){
        super('Game');
    }

    layer;
    player;
    orb;
    doo;
    cursors;
    map;
    

    preload(){
        this.load.image('tiles', ['assets/img/gridtiles.png', 'assets/img/gridtiles.png']);
        this.load.image('orb', 'assets/img/orb.png');
        this.load.image('door', 'assets/img/door.png');
        this.load.tilemapCSV('map', 'assets/csv/grid.csv');
        this.load.spritesheet('player', 'assets/img/player.png', {frameWidth: 32, frameHeight: 32});
        this.load.audio('soundorb', 'assets/sound/coin01.wav');
        this.load.audio('sounddoor', 'assets/sound/door.wav');
    };

    create(){
        this.map = this.make.tilemap({key: 'map', tileWidth: 32, tileHeight: 32});
        const tileset = this.map.addTilesetImage('tiles', null, 32, 32, 0, 0);
        this.layer = this.map.createLayer(0, tileset, 0, 0); //(0, tileset, 0, 0)
        this.map.setCollision([5]);

        this.anims.create({
            key: 'left',
           frames: this.anims.generateFrameNumbers('player', {start:4, end:7}),
    
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', {start:8, end:11}),
        
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', {start:12, end:15}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', {start:0, end:3}),
            frameRate: 10,
            repeat: -1
        });

        this.player = this.physics.add.sprite(74, 950, 'player', 8); // 5800 1696 // 74 80
        this.physics.add.collider(this.player, this.layer);

        this.orb = this.physics.add.sprite( 80, 300, 'orb', 0); // 5600, 1696
        this.physics.add.overlap(this.orb, this.player, this.updateOrb, null, this);

       // this.door = this.physics.add.sprite(5985, 1620, 'door', 0); // 200 80
      //  this.physics.add.overlap(this.door, this.player, this.updateDoor, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player);

        
    };
    update(){
        this.updateMap();
        this.updatePlayer();
    };

    updateMap(){

        // cámara siguiendo al personaje/jugador
        const origin = this.map.getTileAtWorldXY(this.player.x, this.player.y);
        this.map.forEachTile(tile => {
            const dist = Phaser.Math.Distance.Chebyshev(
                origin.x,
                origin.y,
                tile.x,
                tile.y
            );
            tile.setAlpha(1 - 0.1 * (dist - 0.0001)); //(1 - 0.1 * dist)
        });
    };
    updatePlayer(){ //time, delta
        this.player.setVelocity(0);

        if (this.cursors.left.isDown) {
            
            this.player.setVelocityX(-100)
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
           
            this.player.setVelocityX(100);
            this.player.anims.play('right', true);
        }
        else if (this.cursors.up.isDown)
        {
            
            this.player.setVelocityY(-100);
            this.player.anims.play('up', true);
        }
        else if (this.cursors.down.isDown)
        {
            
            this.player.setVelocityY(100);
            this.player.anims.play('down', true);
        }  
        else {
            this.player.anims.stop();
        };
        
    };

    updateOrb(){ //this.physics.add.collider(this.player, this.orb)
        const soundorb = this.sound.add('soundorb');
       soundorb.play();
      this.orb.disableBody(true, true);
      this.door = this.physics.add.sprite(5985, 1620, 'door', 0); // 200 80
      this.physics.add.overlap(this.door, this.player, this.updateDoor, null, this);
      
      

    };

    updateDoor(){
        const sounddoor = this.sound.add('sounddoor');
       sounddoor.play();
        this.scene.start('Final');
    };
  
};

export default Game;