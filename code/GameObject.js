class GameObject {
	constructor(config) {
		// Set x and y of gameobject
		this.x = config.x || 0;
		this.y = config.y || 0;

		this.direction = config.direction || "down";
		
		this.sprite = new Sprite({
			gameObject: this,
			src: config.src || globalPlayerSprite,
			xOffset: config.xOffset || 0,
			yOffset: config.yOffset || 0,
		});
	}

	// Update method
	update() {

	}
}