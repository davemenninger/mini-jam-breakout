console.log('hello');

var Game = {};
var player;
var layer1;
var layer3;

Game.init = function(){
    game.stage.disableVisibilityChange = true;
};

Game.preload = function(){
    game.load.tilemap('map','assets/map/map.json',null,Phaser.Tilemap.TILED_JSON );
    game.load.spritesheet('tileset','assets/sprites/spritesheet.png',8,8);
    game.load.image('grapemon', 'assets/sprites/grapemon.png');
};

Game.create = function(){
    var map = game.add.tilemap('map');
    map.addTilesetImage('spritesheet','tileset');


    layer1 = map.createLayer('Tile Layer 1');
    layer3 = map.createLayer('Tile Layer 3');
    map.setCollisionBetween(10, 14, true, layer3);

    player = game.add.sprite(55, 65, 'grapemon');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    Game.instructions();
};

Game.update = function() {
    game.physics.arcade.collide(player, layer3, null, null, this);

    cursors = game.input.keyboard.createCursorKeys();

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -150;
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
    } else if (cursors.up.isDown) {
        player.body.velocity.y = -150;
    } else if (cursors.down.isDown) {
        player.body.velocity.y = 150;
    } else {
        //  Stand still
        player.animations.stop();
    }
};

Game.instructions = function() {
    text = game.add.text(game.world.centerX, 10, 'use arrow keys to move');

    //    Center align
    text.anchor.set(0.5);
    text.align = 'center';

    //    Font style
    text.font = 'Arial Black';
    text.fontSize = 8;
    text.fontWeight = 'bold';

    //    Stroke color and thickness
    text.stroke = '#000000';
    text.strokeThickness = 1;
    text.fill = '#bbaaff';
};

var game = new Phaser.Game(128,128,Phaser.AUTO,document.getElementById('game'));
