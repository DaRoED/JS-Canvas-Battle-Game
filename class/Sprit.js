class Sprit {
	constructor({ px, py }) {
		this.lastKey = "";
		this.key = {};

		this.status = {
			AT: 30,
			HP: 450,
		};

		this.canvas = canvas;
		this.type = TypeEnum.None;

		this.attackCool = false;
		this.attackBox = {
			width: 70,
			height: 25,
		};

		this.jumpKey = false;
		this.jumpCount = 0;
		this.isJumping = false;

		this.rangeDraw = false;
		this.velocity = { x: 0, y: 0 };
		this.direction = DirectionEnum.None;
		this.moveSpeed = 3;

		this.gravity = 0.3;
		this.width = 35;
		this.height = 70;
		this.px = px;
		this.py = py;

		this.Animation = {
			Idle: false,
			Walk: false,
			Attack: false,
		};
	}

	checkAttack() {}

	getAnimationImages(src, name, maxNum) {
		const Animation = {
			Left: [],
			Right: [],
		};

		for (let i = 0; i < maxNum; i++) {
			const imageL = new Image();
			const imageR = new Image();

			imageL.src = `${src}/${name}Left${i + 1}.png`;
			imageR.src = `${src}/${name}Right${i + 1}.png`;
			Animation.Left.push(imageL);
			Animation.Right.push(imageR);
		}
		return Animation;
	}

	isAnimationExist() {
		return (
			this.IdleAnimation.isPlay ||
			this.WalkAnimation.isPlay ||
			this.AttackAnimation1.isPlay
		);
	}

	draw() {
		c.fillStyle = "#ff8c00";

		this.IdleAnimation.draw();
		this.WalkAnimation.draw();
		this.AttackAnimation1.draw();

		if (this.rangeDraw) {
			if (this.direction === DirectionEnum.Right) {
				c.fillRect(
					this.px,
					this.py,
					this.attackBox.width,
					this.attackBox.height
				);
			}

			if (this.direction === DirectionEnum.Left) {
				c.fillRect(
					this.position.dx - this.attackBox.width,
					this.py,
					this.attackBox.width,
					this.attackBox.height
				);
			}
		}
	}

	dddd() {
		this.rangeDraw = true;
		setTimeout(() => (this.rangeDraw = false), 150);
	}

	jump() {
		this.isJumping = true;
		this.jumpCount -= 1;
	}

	move() {}

	attack() {}

	setCoolTime() {
		this.attackCool = true;
		setTimeout(() => (this.attackCool = false), 700);
	}

	update() {
		this.draw();
		this.velocity.x = 0;

		if (!this.isAnimationExist()) {
			this.IdleAnimation.play();
		}

		if (this.jumpCount >= 1 && this.jumpKey) this.jump();

		if (this.isJumping) {
			if (this.py <= this.canvas.height - this.height - 6)
				this.isJumping = false;
			else this.velocity.y -= 7;
		}

		this.move();

		if (this.isGruond) {
			this.velocity.y = 0;
			this.py = this.canvas.height - this.height;
			this.jumpCount = 1;
			this.isJumping = false;
			this.jumpKey = false;
		} else this.velocity.y += this.gravity;

		this.py += this.velocity.y;
		this.px += this.velocity.x;

		this.isAttack = false;
	}

	get isGruond() {
		return this.position.dy + this.velocity.y >= this.canvas.height;
	}

	setKeyInfo(event, bool) {
		if (!bool) return (this.key[event.key].pressed = bool);
		this.key[event.key].pressed = bool;
		this.lastKey = event.key;
	}

	setAnimationInfo(name, bool) {
		if (!bool) return (this.Animation[name].played = bool);
		this.Animation[name.key].played = bool;
		this.lastAimation = name.key;
	}

	get position() {
		return {
			x: this.px,
			y: this.py,
			dx: this.px + this.width,
			dy: this.py + this.height,
		};
	}
}
