class Enemy extends MovableObject {
	static generateAttrs(scene){
		const x = scene.sys.game.config.width+200;
		const y = Phaser.Math.Between(100, scene.sys.game.config.height-100);
		return {x, y, frame:`enemy${Phaser.Math.Between(1,4)}`}
	}
	static generate(scene, fires){
		const data = Enemy.generateAttrs(scene);
		return new Enemy({
			scene,
			fires,
			x:data.x,
			y: data.y,
			texture: 'enemy',
			frame: data.frame,
			velocity:-250,
			bullet:{
				delay:1000,
				velocity:-500, 
				texture:'bullet',
			},
			origin: {x:0, y:0.5}
		});
	}
	 
	init(data){
		super.init(data)
		this.setOrigin(data.origin.x,data.origin.y)
		this.fires = data.fires||new Fires(this.scene);
		this.timer = this.scene.time.addEvent({
			delay:data.bullet.delay,
			callback:this.fire,
			callbackScope:this,
			loop:true,
		});
		this.bullet=data.bullet
	}
	fire(){
		this.fires.createFire(this);
	}

	reset(scene){
		const data = Enemy.generateAttrs(scene);
		super.reset(data.x, data.y)
		this.setFrame(data.frame);
}
	isDead(){
	return this.x < -this.width
	}
}