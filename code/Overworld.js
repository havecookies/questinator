class Overworld {
	constructor(config) {
		this.element = config.element;
		this.canvas = this.element.querySelector(".game-canvas");
		this.ctx = this.canvas.getContext("2d");

		this.frameRate = 1000 / fps;

		this.map = null;
	}

	startGameLoop() {
		const step = () => {

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
			
			setTimeout(() => {
				step();
			}, this.frameRate)
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