class StartScene extends Phaser.Scene { 
	constructor(){
		super("Start");
	}
	createBg(){
		this.add.sprite(0, 0, 'bg').setOrigin(0,0);
	}
	createStats(data){
		const graphics = this.add.graphics();
		graphics.fillStyle(0x000000, 0.5);
		graphics.fillRoundedRect(config.width/2-200, config.height/2-200, 400, 400);
		const textTitle = data.completed?'Level completed!':'Game over';
		const textScore = `Score: ${data.score}`;
		const textStyle = {
			font:'40px CurseCasual',
			fill:'#ffffff',
		}
		this.add.text(config.width/2, 250, textTitle, textStyle).setOrigin(0.5);
		this.add.text(config.width/2, 350, textScore, {...textStyle, font:'30px CurseCasual'}).setOrigin(0.5);
	}
	createText(){
		this.add.text(this.sys.game.config.width/2, this.sys.game.config.height/4*3, "Tap to begin...", {
			font:'36px CurseCasual',
			fill:'#ffffff',

		}).setOrigin(0.5);
	}
	setEvents(){
		this.input.on("pointerdown", ()=>{
			this.scene.start("Game");
		})
	}
	create(data) {
		console.log('StartScene.create');
		this.createBg();
		if(data.score!==undefined){
			this.createStats(data);
		}
		this.createText();
		this.setEvents();
	}
}