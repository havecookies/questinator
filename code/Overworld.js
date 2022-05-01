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
			
			// If we want to pause this frame, set isCutscenePlaying
			// to true
			if(window.isPaused) {
				this.map.isCutscenePlaying = true;
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
			
			// Draw game objects and sort based on y value
			Object.values(this.map.gameObjects).sort((a,b) => {
				return a.y - b.y;
			}).forEach(object => {
				object.sprite.draw(this.ctx, cameraPerson);
			});
			
			this.map.drawUpperImage(this.ctx, cameraPerson);

			// Get the time after the frame has been rendered
			var stepEndTime = Date.now();

			// Subtract the difference and multiply by 10 to get milliseconds
			var stepTimeDifference = (stepEndTime - stepStartTime) * 0.1;
			
			// Change steps based on the set framerate minus the time difference this frame caused
			setTimeout(step, window.fpms - stepTimeDifference)
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

		this.map.startCutscene([
			{ who: "player", type: "walk", direction: "left"},
			{ who: "player", type: "walk", direction: "down"},
			{ who: "player", type: "walk", direction: "down"},
			{ who: "player", type: "walk", direction: "down"},
			{ who: "player", type: "stand", direction: "right", time: 100 },
			
			{ who: "npcB", type: "walk", direction: "down"},
			{ who: "npcB", type: "walk", direction: "down"},
			{ who: "npcB", type: "walk", direction: "down"},
			{ who: "npcB", type: "walk", direction: "left"},

			{ who: "npcA", type: "stand", direction: "left", time: 500 },
			{ who: "npcA", type: "stand", direction: "right", time: 500 },
			{ who: "npcA", type: "stand", direction: "left", time: 400 },
			{ who: "npcA", type: "stand", direction: "right", time: 400 },
			{ who: "npcA", type: "stand", direction: "left", time: 200 },
			{ who: "npcA", type: "stand", direction: "right", time: 200 },
			{ who: "npcA", type: "stand", direction: "left", time: 100 },
			{ who: "npcA", type: "stand", direction: "right", time: 50 },
			{ who: "npcA", type: "stand", direction: "left", time: 25 },
			{ who: "npcA", type: "stand", direction: "right", time: 20 },
			{ who: "npcA", type: "stand", direction: "left", time: 20 },
			{ who: "npcA", type: "stand", direction: "right", time: 20 },
			{ who: "npcA", type: "stand", direction: "left", time: 20 },
			{ who: "npcA", type: "stand", direction: "right", time: 20 },
			{ who: "npcA", type: "stand", direction: "left", time: 20 },
			{ who: "npcA", type: "stand", direction: "right", time: 20 },
			{ who: "npcA", type: "stand", direction: "left", time: 20 },
			{ who: "npcA", type: "stand", direction: "right", time: 20 },
			{ who: "npcA", type: "stand", direction: "left", time: 20 },
			{ who: "npcA", type: "stand", direction: "right", time: 20 },
			{ who: "npcA", type: "stand", direction: "left", time: 20 },
			{ who: "npcA", type: "stand", direction: "right", time: 20 },
			{ who: "npcA", type: "stand", direction: "left", time: 20 },
			{ who: "npcA", type: "stand", direction: "right", time: 20 },
			{ who: "npcA", type: "stand", direction: "left", time: 20 },
			{ who: "npcA", type: "stand", direction: "right", time: 20 },
			{ who: "npcA", type: "stand", direction: "left", time: 20 },
			{ who: "npcA", type: "stand", direction: "right", time: 20 },
			{ who: "npcA", type: "stand", direction: "left", time: 20 },
			{ who: "npcA", type: "stand", direction: "right", time: 20 },
			{ who: "npcA", type: "stand", direction: "left", time: 20 },
			{ who: "npcA", type: "stand", direction: "right", time: 20 },
			{ who: "npcA", type: "stand", direction: "left", time: 20 },
			{ who: "npcA", type: "stand", direction: "right", time: 20 },
			{ who: "npcA", type: "stand", direction: "left", time: 20 },
			{ who: "npcA", type: "stand", direction: "right", time: 20 },
			{ who: "npcA", type: "stand", direction: "left", time: 20 },
			{ who: "npcA", type: "stand", direction: "right", time: 20 },
			{ who: "npcA", type: "stand", direction: "left", time: 20 },
			{ who: "npcA", type: "stand", direction: "right", time: 20 },
			{ who: "npcA", type: "stand", direction: "left", time: 20 },
			{ who: "npcA", type: "stand", direction: "right", time: 20 },
			{ who: "npcA", type: "stand", direction: "left", time: 20 },
			{ who: "npcA", type: "stand", direction: "right", time: 20 },
			{ who: "npcA", type: "stand", direction: "left", time: 20 },
			{ who: "npcA", type: "stand", direction: "right", time: 20 },
			{ who: "npcA", type: "stand", direction: "left", time: 20 },
			{ who: "npcA", type: "stand", direction: "right", time: 20 },
			{ who: "npcA", type: "stand", direction: "left", time: 20 },
			{ who: "npcA", type: "stand", direction: "right", time: 20 },
			{ who: "npcA", type: "stand", direction: "left", time: 20 },
			{ who: "npcA", type: "stand", direction: "right", time: 20 },
			{ who: "npcA", type: "stand", direction: "left", time: 20 },
			{ who: "npcA", type: "stand", direction: "right", time: 20 },
			{ who: "npcA", type: "stand", direction: "left", time: 20 },
			{ who: "npcA", type: "stand", direction: "right", time: 20 },
			{ who: "npcA", type: "stand", direction: "left", time: 20 },
			{ who: "npcA", type: "stand", direction: "right", time: 20 },
			{ who: "npcA", type: "stand", direction: "left", time: 20 },
			{ who: "npcA", type: "stand", direction: "right", time: 20 },
			{ who: "npcA", type: "stand", direction: "left", time: 20 },
			{ who: "npcA", type: "stand", direction: "right", time: 20 },
			{ who: "npcA", type: "stand", direction: "left", time: 20 },
			{ who: "npcA", type: "stand", direction: "right", time: 20 },
			{ who: "npcA", type: "stand", direction: "left", time: 20 },
			
			{ who: "npcA", type: "walk", direction: "up"},
			{ who: "npcA", type: "walk", direction: "up"},
			{ who: "npcA", type: "walk", direction: "up"},
			{ who: "npcA", type: "walk", direction: "up"},
			{ who: "npcA", type: "walk", direction: "right"},
			{ who: "npcA", type: "walk", direction: "right"},
			{ who: "npcA", type: "walk", direction: "right"},
			{ who: "npcA", type: "walk", direction: "right"},
			{ who: "npcA", type: "walk", direction: "up"},
			{ who: "npcA", type: "stand", direction: "down", time: 1000 },
			{ who: "npcA", type: "walk", direction: "up"},
			{ who: "npcA", type: "walk", direction: "up"},
		]);
	}
}