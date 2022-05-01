class OverworldMap {
	constructor(config) {
		this.gameObjects = config.gameObjects;
		this.walls = config.walls || {};

		this.lowerImage = new Image();
		this.lowerImage.src = config.lowerSrc;

		this.upperImage = new Image();
		this.upperImage.src = config.upperSrc;

		this.isCutscenePlaying = true;
	}

	drawLowerImage(ctx, cameraPerson) {
		ctx.drawImage(
			this.lowerImage,
			Utils.withGrid(6) - cameraPerson.x,
			Utils.withGrid(6) - cameraPerson.y,
		)
	}
	
	drawUpperImage(ctx, cameraPerson) {
		ctx.drawImage(
			this.upperImage,
			Utils.withGrid(6) - cameraPerson.x,
			Utils.withGrid(6) - cameraPerson.y,
		)
	}

	// Can the player move here?
	isSpaceTaken(currentX, currentY, direction) {
		const {x,y} = Utils.nextPosition(currentX, currentY, direction);
		return this.walls[`${x},${y}`] || false;
	}

	mountObjects() {
		Object.keys(this.gameObjects).forEach(key => {

			let object = this.gameObjects[key];
			object.id = key;
			
			//TODO: determine if this object can actually mount
			object.mount(this);

		});
	}

	async startCutscene(events) {
		this.isCutscenePlaying = true;

		for (let i = 0; i < events.length; i++) {
			const eventHandler = new OverworldEvent({
				event: events[i],
				map: this,
			})
			await eventHandler.init();
		}
		
		// Before we finish let's remember to stop the cutscene
		this.isCutscenePlaying = false;
	}
	
	addWall(x, y) {
		this.walls[`${x},${y}`] = true;	
	}
	
	removeWall(x, y) {
		delete this.walls[`${x},${y}`]	
	}
	
	moveWall(wasX, wasY, direction) {
		this.removeWall(wasX, wasY);
		const {x,y} = Utils.nextPosition(wasX, wasY, direction);
		this.addWall(x, y);
	}
}

window.OverworldMaps = {
	DemoRoom: {
		lowerSrc: "images/temp/maps/DemoLower.png",
	    upperSrc: "images/temp/maps/DemoUpper.png",
	    gameObjects: {
			player: new Person({
				isPlayerControlled: true,
				x: Utils.withGrid(3),
				y: Utils.withGrid(6),
				xOffset: 8,
				yOffset: 18,
			}),
			npcA: new Person({
				x: Utils.withGrid(3),
				y: Utils.withGrid(9),
				src: "images/temp/characters/people/npc1.png",
				xOffset: 8,
				yOffset: 18,
				behaviorLoop: [
					{ type: "stand", direction: "left", time: 800},
					{ type: "stand", direction: "up", time: 800},
					{ type: "stand", direction: "down", time: 1200},
					{ type: "stand", direction: "right", time: 300},
				]
			}),
			npcB: new Person({
				x: Utils.withGrid(5),
				y: Utils.withGrid(6),
				src: "images/temp/characters/people/npc2.png",
				xOffset: 8,
				yOffset: 18,
				behaviorLoop: [
					{ type: "walk", direction: "left"},
					{ type: "stand", direction: "up", time: 800},
					{ type: "walk", direction: "up"},
					{ type: "walk", direction: "right"},
					{ type: "walk", direction: "down"},
				],
			}),
	    },
		walls: {
			[Utils.asGridCoord(1,3)]: true,
			[Utils.asGridCoord(2,3)]: true,
			
			[Utils.asGridCoord(3,4)]: true,
			[Utils.asGridCoord(4,4)]: true,
			
			[Utils.asGridCoord(5,3)]: true,
			[Utils.asGridCoord(6,4)]: true,
			
			[Utils.asGridCoord(6,3)]: true,
			[Utils.asGridCoord(6,2)]: true,
			[Utils.asGridCoord(6,1)]: true,
			
			[Utils.asGridCoord(8,3)]: true,
			[Utils.asGridCoord(8,2)]: true,
			[Utils.asGridCoord(8,1)]: true,
			
			[Utils.asGridCoord(8,4)]: true,
			[Utils.asGridCoord(9,3)]: true,
			[Utils.asGridCoord(10,3)]: true,

			[Utils.asGridCoord(7,6)]: true,
			[Utils.asGridCoord(8,6)]: true,
			[Utils.asGridCoord(7,7)]: true,
			[Utils.asGridCoord(8,7)]: true,
		}
  },
  Kitchen: {
    lowerSrc: "images/temp/maps/KitchenLower.png",
    upperSrc: "images/temp/maps/KitchenUpper.png",
    gameObjects: {
    	player: new Person({
        	x: Utils.withGrid(3),
        	y: Utils.withGrid(5),
    	}),
    	npcA: new GameObject({
        	x: Utils.withGrid(9),
        	y: Utils.withGrid(6),
        	src: "images/temp/characters/people/npc2.png"
    	}),
    	npcB: new GameObject({
    		x: Utils.withGrid(10),
    		y: Utils.withGrid(8),
    		src: "images/temp/characters/people/npc3.png"
    	})
    }
  }
}