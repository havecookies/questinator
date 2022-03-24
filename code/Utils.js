const Utils = {
  	withGrid(n) {
    	// Multiplies a value by our grid size.
    	return n * globalGridSize;
  	},

	asGridCoord(x,y) {
		return `${x*globalGridSize},${y*globalGridSize}`
	}
}