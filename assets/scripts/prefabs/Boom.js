class Boom extends Phaser.GameObjects.Sprite {
	static generate(scene,x,y){
		return new Boom({scene,x,y});
	}
	constructor(data){
		super(data.scene, data.x, data.y, 'boom', 'boom1');
		this.scene.add.existing(this);
		const frames = this.scene.anims.generateFrameNames('boom', {
			prefix:'boom',
			start:1,
			end:4,
		});

		this.scene.anims.create({
			key: 'boom',
			frames,
			frameRate:12,
			repeat:0,
		});
		this.play('boom');
		this.once('animationcomplete', ()=>{this.destroy()}, this)
	}
}