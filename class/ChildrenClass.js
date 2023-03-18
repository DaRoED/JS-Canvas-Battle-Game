class Player extends Sprit {
	constructor({ px, py, color, type }) {
		super({ px, py, color, type });
		this.type = TypeEnum.Player;
		this.direction = DirectionEnum.Right;
		this.oppoenetHpBar = document.getElementById("enemyHP");
		this.key = {
			a: {
				pressed: false,
			},
			d: {
				pressed: false,
			},
		};
		this.AttackAnimationOffset1 = {
			Left: [
				[0, 0],
				[0, 0],
				[-40, 0],
				[-40, 0],
			],
			Right: [
				[0, 0],
				[0, 0],
				[0, 0],
				[0, 0],
			],
		};

		this.IdleAnimation = AnimationBuilder.Builder()
			.setName("Idle")
			.setUnitType(this)
			.setAnimationImages(
				this.getAnimationImages("assets/sprits/Samurai/Idle", "idle", 6)
			)
			.setAnimateTime(200)
			.build();

		this.WalkAnimation = AnimationBuilder.Builder()
			.setName("Walk")
			.setUnitType(this)
			.setAnimationImages(
				this.getAnimationImages("assets/sprits/Samurai/Walk", "walk", 8)
			)
			.setAnimateTime(150)
			.build();

		this.AttackAnimation1 = AnimationBuilder.Builder()
			.setName("Attack1")
			.setIsOnce(true)
			.setUnitType(this)
			.setCallback((isWalking) =>
				isWalking ? this.WalkAnimation.play() : false
			)
			.setAnimationOffset(this.AttackAnimationOffset1)
			.setAnimationImages(
				this.getAnimationImages(
					"assets/sprits/Samurai/Attack/Attack_1",
					"Attack",
					4
				)
			)
			.setAnimateTime(75)
			.build();

		this.IdleAnimation.play();
	}

	move() {
		if (this.key.a.pressed && this.lastKey === "a") {
			this.velocity.x = -this.moveSpeed;
			this.direction = DirectionEnum.Left;
		} else if (this.key.d.pressed && this.lastKey === "d") {
			this.velocity.x = this.moveSpeed;
			this.direction = DirectionEnum.Right;
		}
	}

	attack() {
		if (this.checkAttack() && !this.attackCool) {
			this.AttackAnimation1.play(this.WalkAnimation.isPlay);
			this.IdleAnimation.stop();
			this.WalkAnimation.stop();
			enemy.status.HP -= this.status.AT;
			this.oppoenetHpBar.style.width = `${enemy.status.HP}px`;
			this.setCoolTime();
		}
	}

	checkAttack() {
		return this.direction === DirectionEnum.Right
			? this.px + this.attackBox.width >= enemy.px &&
					this.px <= enemy.position.dx &&
					this.py + this.attackBox.height >= enemy.py
			: this.position.dx - this.attackBox.width <= enemy.position.dx &&
					this.position.dx >= enemy.px &&
					this.py + this.attackBox.height >= enemy.py;
	}
}

class Enemy extends Sprit {
	constructor({ px, py, color, type }) {
		super({ px, py, color, type });
		this.type = TypeEnum.Enemy;
		this.direction = DirectionEnum.Left;
		this.oppoenetHpBar = document.getElementById("playerHP");
		this.key = {
			ArrowLeft: {
				pressed: false,
			},
			ArrowRight: {
				pressed: false,
			},
		};
		this.AttackAnimationOffset1 = {
			Left: [
				[0, 0],
				[0, 0],
				[-40, 0],
				[-40, 0],
			],
			Right: [
				[0, 0],
				[0, 0],
				[0, 0],
				[0, 0],
			],
		};

		this.IdleAnimation = AnimationBuilder.Builder()
			.setName("Idle")
			.setUnitType(this)
			.setAnimationImages(
				this.getAnimationImages("assets/sprits/Samurai/Idle", "idle", 6)
			)
			.setAnimateTime(200)
			.build();

		this.WalkAnimation = AnimationBuilder.Builder()
			.setName("Walk")
			.setUnitType(this)
			.setAnimationImages(
				this.getAnimationImages("assets/sprits/Samurai/Walk", "walk", 8)
			)
			.setAnimateTime(150)
			.build();

		this.AttackAnimation1 = AnimationBuilder.Builder()
			.setName("Attack1")
			.setIsOnce(true)
			.setUnitType(this)
			.setCallback((isWalking) =>
				isWalking ? this.WalkAnimation.play() : false
			)
			.setAnimationOffset(this.AttackAnimationOffset1)
			.setAnimationImages(
				this.getAnimationImages(
					"assets/sprits/Samurai/Attack/Attack_1",
					"Attack",
					4
				)
			)
			.setAnimateTime(75)
			.build();

		this.IdleAnimation.play();
	}

	move() {
		if (this.key.ArrowLeft.pressed && this.lastKey === "ArrowLeft") {
			this.velocity.x = -this.moveSpeed;
			this.direction = DirectionEnum.Left;
		} else if (
			this.key.ArrowRight.pressed &&
			this.lastKey === "ArrowRight"
		) {
			this.velocity.x = this.moveSpeed;
			this.direction = DirectionEnum.Right;
		}
	}

	attack() {
		if (this.checkAttack() && !this.attackCool) {
			this.AttackAnimation1.play(this.WalkAnimation.isPlay);
			this.IdleAnimation.stop();
			this.WalkAnimation.stop();
			player.status.HP -= this.status.AT;
			this.oppoenetHpBar.style.width = `${player.status.HP}px`;
			this.setCoolTime();
		}
	}

	checkAttack() {
		return this.direction === DirectionEnum.Left
			? this.position.dx - this.attackBox.width <= player.position.dx &&
					this.position.dx >= player.px &&
					this.py + this.attackBox.height >= player.py
			: this.px + this.attackBox.width >= player.px &&
					this.px <= player.position.dx &&
					this.py + this.attackBox.height >= player.py;
	}
}
