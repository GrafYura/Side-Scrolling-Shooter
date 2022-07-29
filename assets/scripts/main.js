var config = {
    type: Phaser.AUTO, // webgl or canvas
    width: 1280,
    height: 720,
		physics:{
			default: 'arcade',
			arcade: {
				debug: false
			},
		},
    scene:[BootScene, PreloadScene, StartScene, GameScene],
};

let game = new Phaser.Game(config);