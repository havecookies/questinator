// Figured it out, using "window." before the variable
// allows it to become a global variable that you can use
// anywhere in the code, just make sure to not set it to
// anything that could get confused with a local object

window.globalGridSize = 16;