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
		
		if (this.movingProgressRemaining > 0) {
        	this.updatePosition();
		} else {
		
			// More cases for starting to walk if needed
	
			// Case: We're a player and have an arrow pressed
			if(!state.map.isCutscenePlaying && this.isPlayerControlled && state.arrow) {
				this.startBehavior(state, {
					type: "walk",
					direction: state.arrow
	,			});
			}
			
			// Print player location if needed
			// if(globalDebugEnabled && this.isPlayerControlled) console.log("x: "+ this.x + ", y: " + this.y);
			this.updateSprite();
		}	
	}
	
	startBehavior(state, behavior) {
		// Set character direction to whatever behavior was
		this.direction = behavior.direction;

		if(behavior.type === "walk") {
			
			// Stop here if space is not free
			if(state.map.isSpaceTaken(this.x, this.y, this.direction)) {
				if(globalDebugEnabled) console.log("This space is not walkable");
				
				// If has retry enabled, retry the walk
				behavior.retry && setTimeout(() => {
					this.startBehavior(state, behavior)
				}, window.fpms)

				return;
			}
			else {
				if(globalDebugEnabled) console.log("This space is walkable");
			}

			// Ready to move
			state.map.moveWall(this.x, this.y, this.direction);
			this.movingProgressRemaining = Utils.withGrid(1);
			this.updateSprite();
		}

		if (behavior.type === "stand") {
			setTimeout(() => {
				Utils.emitEvent("PersonStandComplete", {
					whoId: this.id
				});
			}, behavior.time)
		}
	}

    updatePosition() {
        const [property, change] = this.directionUpdate[this.direction];
        this[property] += change * movementSpeed;
        this.movingProgressRemaining -= 1 * movementSpeed;

		if(this.movingProgressRemaining === 0) {
			// We finished the walk
			Utils.emitEvent("PersonWalkingComplete", {
				whoId: this.id
			});
		}
	}
	
	updateSprite() {
		
		if (this.movingProgressRemaining > 0) {
			this.sprite.setAnimation("walk-" + this.direction);
			return;
		}
		
		this.sprite.setAnimation("idle-" + this.direction);
	} 
}