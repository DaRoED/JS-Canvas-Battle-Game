class Timer {
	constructor() {
		this.time = 150;
		this.intervalId = null;
		this.main();
	}

	main() {
		this.intervalId = setInterval(() => {
			if (this.timeIsLessZero()) {
				if (player.status.HP > enemy.status.HP) {
					this.setDisplayText("player1 won");
				} else if (enemy.status.HP > player.status.HP) {
					this.setDisplayText("player2 won");
				} else if (enemy.status.HP === player.status.HP) {
					this.setDisplayText("draw");
				}

				this.clearReduceTime();
				return;
			}

			this.reduceTime();
			this.showTime();
		}, 1000);
	}

	setDisplayText(text) {
		const display = document.getElementById("display");
		display.style.display = "flex";
		display.innerText = text;
	}

	showTime() {
		document.getElementById("timer").innerText = this.time;
	}

	reduceTime() {
		this.time -= 1;
	}

	clearReduceTime() {
		clearInterval(this.intervalId);
	}

	timeIsLessZero() {
		return this.time <= 0;
	}
}
