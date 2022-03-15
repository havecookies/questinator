class Sprite {
	constructor(config) {

		// Setup the image
		this.image = new Image();
		this.image.src = config.src;
		this.image.onload = () => {
			this.isLoaded = true;
		}

		// Shadow
		this.shadow = new Image();
		this.useShadow = true;
		if (this.useShadow) {
			this.shadow.src = "images/temp/characters/shadow.png"
		}
		this.shadow.onLoad = () => {
			this.isShadowLoaded = true;
		}
		

		// Configure Animations & Initial State
		this.animations = config.animations || {
			idleDown: [
				[0, 0]
			]
		}
		this.currentAnimation = config.currentAnimation || "idleDown";
		this.currentAnimationFrame = 0;

		// Reference the game object
		this.gameObject = config.gameObject;

		this.xOffset = config.xOffset || 0;
		this.yOffset = config.yOffset || 0;
	}

	draw(ctx) {
		const x = this.gameObject.x - this.xOffset;
		const y = this.gameObject.y - this.yOffset;

		this.isShadowLoaded && ctx.drawImage(this.shadow, x, y)
		
		this.isLoaded && ctx.drawImage(this.image,
			0, 0, // x and y of image
			32, 32, // width and height to take from image
			x, y, // position of image in scene
			32, 32, // width and height of image in scene
		);
	}
}