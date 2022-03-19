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
            this[property] += change;
            this.movingProgressRemaining -= 1;
        }
    }
}