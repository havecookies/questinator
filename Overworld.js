class Overworld {
	constructor(config) {
		this.element = config.element;
		this.canvas = this.element.querySelector(".game-canvas");
		this.ctx = this.canvas.getContext("2d");
	}

	init() {

		// Background image
		const image = new Image();
		// Draw image
		image.onload = () => {
			this.ctx.drawImage(image, 0, 0)
		}
		// Image source
		image.src = "/images/temp/maps/DemoLower.png";

		const x = 5;
		const y = 6;

		const shadow = new Image();
		shadow.onload = () => {
			this.ctx.drawImage(
				player,
				0, // left cut 
				0, // top cut
				32, // width of cut
				32, // height of cut
				x * 16 - 8,
				y * 16 - 18,
				32,
				32
			)
		}
		shadow.src = "/images/temp/characters/people/shadow.png"
		
		const player = new Image();
		player.onload = () => {
			this.ctx.drawImage(
				player,
				0, // left cut 
				0, // top cut
				32, // width of cut
				32, // height of cut
				x * 16 - 8,
				y * 16 - 18,
				32,
				32
			)
		}
		player.src = "/images/temp/characters/people/hero.png"
	}
}