const Utils = {
  	withGrid(n) {
    	// Multiplies a value by our grid size.
    	return n * globalGridSize;
  	},

	asGridCoord(x,y) {
		return `${x*globalGridSize},${y*globalGridSize}`
	},
  
	nextPosition(initialX, initialY, direction) {
		let x = initialX;
		let y = initialY;
		const size = globalGridSize;

		// Switch statement for all the directions,
		// not ideal but it's better than a if/else
		// chain.
		switch (direction) {
			case "left":
				x -= size;
				break;
				
			case "right":
				x += size;
				break;
				
			case "up":
				y -= size;
				break;
				
			case "down":
				y += size;
				break;
		}

		return {x,y};
	},
}