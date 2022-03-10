class GameObject {
	constructor(config) {
		// Set x and y of gameobject
		this.x = config.x || 0;
		this.y = config.y || 0;

		this.direction = config.direction || "down";

		this.sprite = new Sprite({
			gameObject: this,
			src: config.src || "/images/temp/characters/people/hero.png",
		});
	}

	// Update method
	update() {

	}
}