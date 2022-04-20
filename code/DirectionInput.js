class DirectionInput {
	constructor() {
		this.heldDirections = [];

		this.map = {
			"ArrowUp": "up",
			"KeyW": "up",
			"ArrowDown": "down",
			"KeyS": "down",
			"ArrowLeft": "left",
			"KeyA": "left",
			"ArrowRight": "right",
			"KeyD": "right",
			"KeyL": "left",
		}
	}

	// Allow other classes to quickly get the held direction key
	get direction() {
		return this.heldDirections[0];
	}
	
	init() {
		// Find movement direction when key is pressed
		document.addEventListener("keydown", e => {
			const dir = this.map[e.code];
			
			if (dir && this.heldDirections.indexOf(dir) === -1) {
				this.heldDirections.unshift(dir);
				if (globalDebugEnabled) console.log(this.heldDirections);
			}
		});

		document.addEventListener("keyup", e => {
			const dir = this.map[e.code];
			const index = this.heldDirections.indexOf(dir);
			
			if (index > -1) {
				this.heldDirections.splice(index, 1);
				if (globalDebugEnabled) console.log(this.heldDirections);
			}
		});
	}
}