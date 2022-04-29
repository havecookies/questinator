class Overworld {
	constructor(config) {
		this.element = config.element;
		this.canvas = this.element.querySelector(".game-canvas");
		this.ctx = this.canvas.getContext("2d");

		this.map = null;
	}

	static isPaused = false;

	startGameLoop() {
		const step = () => {
			
			while(Overworld.isPaused) {
				// Run at 15 frames per second until it is not paused
				setTimeout(step, 1000 / 15);
				return;
			}
			
			// Get the time before the frame starts (not including pauses)
			var stepStartTime = Date.now();

			// Clear previous frame
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

			// Establish the camera person
			const cameraPerson = this.map.gameObjects.player;

			// Update all of our objects before drawing
			Object.values(this.map.gameObjects).forEach(object => {
				object.update({
					arrow: this.directionInput.direction,
					map: this.map,
				});
			});
			
			// Draw lower map layer
			this.map.drawLowerImage(this.ctx, cameraPerson);
			
			// Draw Game Objects
			Object.values(this.map.gameObjects).forEach(object => {
				object.sprite.draw(this.ctx, cameraPerson);
			});
			
			this.map.drawUpperImage(this.ctx, cameraPerson);

			// Get the time after the frame has been rendered
			var stepEndTime = Date.now();

			// Subtract the difference and multiply by 10 to get milliseconds
			var stepTimeDifference = (stepEndTime - stepStartTime) * 10;
			
			// Change steps based on the set framerate minus the time difference this frame caused
			setTimeout(step, window.fpms - (stepTimeDifference * 0.1))
		}
		step();
	}
	
	init() {
		this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
		
		if (globalDebugEnabled) console.log("This map's wall positions: " + this.map.walls);
		this.map.mountObjects();
		
		this.directionInput = new DirectionInput();
		this.directionInput.init();
		
		this.startGameLoop();
	}
}