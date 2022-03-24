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
			"idle-down": 	[ [0, 0] ],
			"idle-right": 	[ [0, 1] ],
			"idle-up": 		[ [0, 2] ],
			"idle-left": 	[ [0, 3] ],
			"walk-down": 	[ [1, 0], [0, 0], [3, 0], [0, 0] ],
			"walk-right": 	[ [1, 1], [0, 1], [3, 1], [0, 1] ],
			"walk-up": 		[ [1, 2], [0, 2], [3, 2], [0, 2] ],
			"walk-left": 	[ [1, 3], [0, 3], [3, 3], [0, 3] ],
		};
		this.currentAnimation = config.currentAnimation || "idle-down";
		this.currentAnimationFrame = 0;

		this.animationFrameLimit = config.animationFrameLimit || Utils.withGrid(1);
		this.animationFrameProgress = this.animationFrameLimit;

		// Reference the game object
		this.gameObject = config.gameObject;

		this.xOffset = config.xOffset || 0;
		this.yOffset = config.yOffset || 0;
	}

	get frame() {
		return this.animations[this.currentAnimation][this.currentAnimationFrame];
	}

	setAnimation(key) {
		if (this.currentAnimation !== key) {
			this.currentAnimation = key;
			this.currentAnimationFrame = 0;
			this.animationFrameProgress = this.animationFrameLimit;
		}
	}

	updateAnimationProgress() {
		// Downtick frame progress
		if(this.animationFrameProgress > 0) {
			this.animationFrameProgress -= 1;
			return;
		}

		// Reset the counter
		this.animationFrameProgress = this.animationFrameLimit;
		this.currentAnimationFrame += 1;

		if(this.frame === undefined) {
			this.currentAnimationFrame = 0;
		}
	}
	
	draw(ctx, cameraPerson) {
		const x = this.gameObject.x - this.xOffset + Utils.withGrid(6) - cameraPerson.x;
		const y = this.gameObject.y - this.yOffset + Utils.withGrid(6) - cameraPerson.y;

		this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);
		
		const [frameX, frameY] = this.frame;
		
		this.isLoaded && ctx.drawImage(this.image,
			frameX * 32, frameY * 32, // x and y of image
			32, 32, // width and height to take from image
			x, y, // position of image in scene
			32, 32, // width and height of image in scene
		);
		
		this.updateAnimationProgress();
	}
}