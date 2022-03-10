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
			this.shadow.src = "/images/temp/characters/shadow.png"
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

		// Easily set the grid size & sprite offset
		this.gridSize = config.gridSize || 16;
		this.xOffset = config.xOffset || 8;
		this.yOffset = config.yOffset || 18;

		// Reference the game object
		this.gameObject = config.gameObject;
		
	}

	draw(ctx) {
		const x = this.gameObject.x * this.gridSize - 8;
		const y = this.gameObject.y * this.gridSize - 18;

		this.isShadowLoaded && ctx.drawImage(this.shadow, x, y)
		
		this.isLoaded && ctx.drawImage(this.image,
			0, 0,
			32, 32,
			x, y,
			32, 32,		  
		);
	}
}