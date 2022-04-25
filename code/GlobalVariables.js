// Use "window." to make it global, just make sure to not
// set it to anything that could get confused with a 
// local object

window.globalGridSize = 16;

// Must be divisible by the global grid size
// oh and JS does not like decimals
window.movementSpeed = 1;

// This is so we can change the player's sprite easily
window.globalPlayerSprite = "images/temp/characters/people/hero.png";

window.globalDebugEnabled = false;

// use changeFPS to edit the fps, the second number is in fps if you need to change it
window.fpms = 1000 / 60;

// Takes input (framesPerSecond), turns it into frames 
// per millisecond, prints it to console, and then
// actually changes the frame rate 
function changeFPS(framesPerSecond) {    
    milliseconds = 1000 / framesPerSecond;
    
    if(framesPerSecond <= 0) {
        Overworld.isPaused = true;

        framesPerSecond = 0;
        milliseconds = 0;
        console.log("Setting fps.\n\n  seconds: " + framesPerSecond + "\n       ms: " + milliseconds);

        return;
    } else {
        Overworld.isPaused = false;
    }

    console.log("Setting fps.\n\n  seconds: " + framesPerSecond + "\n       ms: " + milliseconds);
    

    fpms = milliseconds;
}