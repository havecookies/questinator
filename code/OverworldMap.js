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
	    lowerSrc: "images/not-temp/maps/DemoLower.png",
	    upperSrc: "images/not-temp/maps/DemoUpper.png",
	    gameObjects: {
			  player: new Person({
				  x: Utils.withGrid(5),
				  y: Utils.withGrid(6),
			  }),
			  npc1: new Person({
				  x: Utils.withGrid(7),
				  y: Utils.withGrid(9),
				  src: "images/temp/characters/people/npc1.png",
				  xOffset: 8,
				  yOffset: 18,
			  })
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