class OverworldMap {
	constructor(config) {
		this.gameObjects = config.gameObjects;

		this.lowerImage = new Image();
		this.lowerImage.src = config.lowerSrc;

		this.upperImage = new Image();
		this.upperImage.src = config.upperSrc;
	}

	drawLowerImage(ctx) {
		ctx.drawImage(this.lowerImage, 0, 0)
	}
	
	drawUpperImage(ctx) {
		ctx.drawImage(this.upperImage, 0, 0)
	}
}

window.OverworldMaps = {
	DemoRoom: {
	    lowerSrc: "images/temp/maps/DemoLower.png",
	    upperSrc: "images/temp/maps/DemoUpper.png",
	    gameObjects: {
			  player: new Person({
				  x: utils.withGrid(5),
				  y: utils.withGrid(6),
			  }),
			  npc1: new Person({
				  x: utils.withGrid(7),
				  y: utils.withGrid(9),
				  src: "images/temp/characters/people/npc1.png"
			  })
	    }
  },
  Kitchen: {
    lowerSrc: "images/temp/maps/KitchenLower.png",
    upperSrc: "images/temp/maps/KitchenUpper.png",
    gameObjects: {
    	player: new Person({
        	x: utils.withGrid(3),
        	y: utils.withGrid(5),
    	}),
    	npcA: new GameObject({
        	x: utils.withGrid(9),
        	y: utils.withGrid(6),
        	src: "images/temp/characters/people/npc2.png"
    	}),
    	npcB: new GameObject({
    		x: utils.withGrid(10),
    		y: utils.withGrid(8),
    		src: "images/temp/characters/people/npc3.png"
    	})
    }
  }
}