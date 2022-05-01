class OverworldEvent {
	constructor({map, event}) {
		this.map = map;
		this.event = event;
	}

	stand(resolve) {
		
	}

	walk(resolve) {
		const who = this.map.gameObjects[ this.event.who ];
		who.startBehavior({
			map: this.map,
		},{
			type: "walk",
			direction: this.event.direction,
		});

		document.addEventListener("PersonWalkingComplete", completeHandler)
	}

	init() {

		// Mixing OOP with other stuff!
		return new Promise(resolve => {
			this[this.event.type](resolve)
		})
	}
}