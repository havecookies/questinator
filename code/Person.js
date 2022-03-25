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
		this.updateSprite(state);
		
		if (this.movingProgressRemaining > 0) {
        	this.updatePosition();
			return;
		}
		
		// Print player location if needed
		// if(globalDebugEnabled && this.isPlayerControlled) console.log("x: "+ this.x + ", y: " + this.y)
		

		// Case: We're a player and have an arrow pressed
		if(this.isPlayerControlled && state.arrow) {
			this.startBehavior(state, {
				type: "walk",
				direction: state.arrow
,			});
		}
    }

	startBehavior(state, behavior) {
		// Set character direction to whatever behavior was
		this.direction = behavior.direction;

		if(behavior.type === "walk") {
			
			// Stop here if space is not free
			if(state.map.isSpaceTaken(this.x, this.y, this.direction)) {
				if(globalDebugEnabled) console.log("This space is not walkable");

				return;
			}
			else {
				if(globalDebugEnabled) console.log("This space is walkable");
			}
			
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