class Person extends GameObject {
    constructor(config) {
        super(config);

        this.movingProgressRemaining = 0;
        
        this.isPlayerControlled = config.isPlayerControlled || false;

        this.directionUpdate = {
            "up" : ["y", -1],
            "down" : ["y", 1],
            "left" : ["x", -1],
            "right" : ["x", 1],
        }
    }

    update(state) {
        this.updatePosition();
		this.updateSprite(state);

		// If we have an arrow pressed, let's move our character if they're not already
		// moving between tiles, this feels nice
		if(this.isPlayerControlled && this.movingProgressRemaining === 0 && state.arrow) {
			this.direction = state.arrow;
			this.movingProgressRemaining = Utils.withGrid(1);
		}
    }

    updatePosition() {
        if (this.movingProgressRemaining > 0) {
            const [property, change] = this.directionUpdate[this.direction]
            this[property] += change * movementSpeed;
            this.movingProgressRemaining -= 1 * movementSpeed;
        }
    }
	
	updateSprite(state) {
		if(this.isPlayerControlled && this.movingProgressRemaining === 0 && !state.arrow) {
			this.sprite.setAnimation("idle-" + this.direction);
			return;
		}

		if(this.movingProgressRemaining > 0) {
			this.sprite.setAnimation("walk-" + this.direction);
		}
	} 
}