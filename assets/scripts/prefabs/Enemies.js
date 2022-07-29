class Enemies extends Phaser.Physics.Arcade.Group{
	constructor(scene){
		super(scene.physics.world, scene);
		this.scene = scene;
		this.countMax=10;
		this.countCreated=0;
		this.countKilled=0;
		this.createTimer();
		this.fires = new Fires(this.scene);
	}
	createEnemy(){
		let enemy = this.getFirstDead()
		if(!enemy){
			enemy = Enemy.generate(this.scene, this.fires);
			enemy.on('killed', this.onEnemyKilled, this)
			this.add(enemy);
		}
		else{
			enemy.reset(this.scene);
		}
		enemy.move();
	}

	onEnemyKilled(){
		this.countKilled++;
		if(this.countKilled==this.countMax)
			this.scene.events.emit('enemies-killed');
	}

	createTimer(){
		this.timer = this.scene.time.addEvent({
			delay:1000,
			callback:this.tick,
			callbackScope:this,
			loop:true,
		})
	}
	tick(){
		if(this.countCreated<this.countMax){
			this.countCreated++;
			this.createEnemy();
		}
		else
		{
			this.timer.remove();
		}
	}
}