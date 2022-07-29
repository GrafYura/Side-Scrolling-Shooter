class GameScene extends Phaser.Scene { 
	constructor(){
		super("Game");
	}
	init(){
		this.cursors = this.input.keyboard.createCursorKeys();
		this.score = 0;
	}
	createBg(){
		this.bg = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height,'bg').setOrigin(0,0);
	}
	createCompleteEvents(){
		this.player.once('killed', this.onComplete, this);
		this.events.once('enemies-killed', this.onComplete, this);
	}

	addOverlap(){
		this.physics.add.overlap(this.player.fires, this.enemies, this.onOverlap, undefined, this);
		this.physics.add.overlap(this.enemies, this.player,this.onOverlap, undefined, this);
		this.physics.add.overlap(this.enemies.fires, this.player, this.onOverlap, undefined, this);
	}
	createTextScore(){
		this.text=this.add.text(10,10, `score:${this.score}`, {
			font:'36px CurseCasual',
			fill:'#ffffff',

		}).setOrigin(0);
	}
	create() {
		this.createBg();
		this.enemies = new Enemies(this);
		this.player = new Player(this);
		this.createCompleteEvents();
		this.addOverlap();
		this.createTextScore();
		console.log('GameScene.create');
	}
	onComplete(){
		this.scene.start("Start",{score:this.score, completed:this.player.active});
	}
	onOverlap(source, target){
		source.setAlive(false);
		target.setAlive(false);
		const enemy = [source, target].find(item => item instanceof Enemy);
		if(enemy){
			this.score++;
			this.text.setText(`score:${this.score}`);
			Boom.generate(this, enemy.x, enemy.y);
		}

	}
	update(){
		this.player.move();
		this.bg.tilePositionX+=0.5
	}
}