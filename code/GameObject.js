class GameObject {
	constructor(config) {
		this.id = null;
		
		this.isMounted = false;
		
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

	mount(map) {
		if (globalDebugEnabled) console.log(`Mounting GameObject at ${this.x}, ${this.y} to world.`);
		
		this.isMounted = true;
		map.addWall(this.x, this.y);
	}

	// Update method
	update() {

	}
}