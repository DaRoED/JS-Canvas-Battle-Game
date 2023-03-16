window.addEventListener("keydown", (event) => {
	switch (event.key) {
		case "a":
			player.setKeyInfo(event, true);
			break;

		case "d":
			player.setKeyInfo(event, true);
			break;

		case "w":
			player.jumpKey = true;
			break;

		case " ":
			player.attack();
			break;

		case "ArrowLeft":
			enemy.setKeyInfo(event, true);
			break;

		case "ArrowRight":
			enemy.setKeyInfo(event, true);
			break;

		case "ArrowUp":
			enemy.jumpKey = true;
			break;

		case "Enter":
			enemy.attack();
			break;
	}
});

window.addEventListener("keydown", (event) => {
	switch (event.key) {
		case "a":
			if (
				!player.WalkAnimation.isPlay &&
				!player.AttackAnimation1.isPlay
			) {
				player.IdleAnimation.stop();
				player.WalkAnimation.play();
			}
			break;
		case "d":
			if (
				player.AttackAnimation1.isPlay &&
				!player.AttackAnimation1.isPlay
			) {
				return player.WalkAnimation.stop();
			}

			if (!player.WalkAnimation.isPlay) {
				player.IdleAnimation.stop();
				player.WalkAnimation.play();
			}
			break;
		case "ArrowLeft":
			if (!enemy.WalkAnimation.isPlay && !enemy.AttackAnimation1.isPlay) {
				enemy.IdleAnimation.stop();
				enemy.WalkAnimation.play();
			}
			break;
		case "ArrowRight":
			if (!enemy.WalkAnimation.isPlay && !enemy.AttackAnimation1.isPlay) {
				enemy.IdleAnimation.stop();
				enemy.WalkAnimation.play();
			}
			break;
	}
});

window.addEventListener("keyup", (event) => {
	switch (event.key) {
		case "a":
			player.setKeyInfo(event, false);
			if (!player.key.d.pressed) player.WalkAnimation.stop();
			break;

		case "d":
			player.setKeyInfo(event, false);
			if (!player.key.a.pressed) player.WalkAnimation.stop();
			break;

		case "ArrowLeft":
			enemy.setKeyInfo(event, false);
			if (!enemy.key.ArrowRight.pressed) enemy.WalkAnimation.stop();
			break;

		case "ArrowRight":
			enemy.setKeyInfo(event, false);
			if (!enemy.key.ArrowLeft.pressed) enemy.WalkAnimation.stop();
			break;
	}
});
