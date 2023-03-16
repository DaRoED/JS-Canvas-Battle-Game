class Backfround {
	constructor({ src }) {
		this.image = new Image();
		this.image.src = src;
	}

	draw() {
		c.drawImage(this.image, 0, 0);
	}
}
