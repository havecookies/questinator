const utils = {
    withGrid(n) {
        // Multiply the value by our grid size to be on
        // the grid. Easily extendable based on what we
        // choose to be our grid
        return n * globalGridSize;
    }
}