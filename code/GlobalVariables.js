// Use "window." to make it global, just make sure to not
// set it to anything that could get confused with a 
// local object

window.globalGridSize = 16;

// Must be divisible by the global grid size
// oh and JS does not like decimals
window.movementSpeed = 1;

// This is so we can change the player's sprite easily
window.globalPlayerSprite = "images/temp/characters/people/hero.png";

window.globalDebugEnabled = true;