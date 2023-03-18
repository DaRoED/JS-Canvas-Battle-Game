class AnimationBuilder {
	#name;
	#isPlay;
	#isOnce;
	#animateTime;
	#animationCount;
	#animationOffset;
	#AnimationImages;
	#maxAnimationCount;
	#unitType;
	#intervalId;
	#callback;

	constructor(build) {
		this.#isPlay = false;
		this.#name = build.name;
		this.#isOnce = build.isOnce;
		this.#unitType = build.unitType;
		this.#callback = build.callback;
		this.#animateTime = build.animateTime;
		this.#animationCount = build.animationCount;
		this.#animationOffset = build.animationOffset;
		this.#AnimationImages = build.animationImages;
		this.#maxAnimationCount = build.maxAnimationCount;
	}

	play(arg) {
		if (this.#intervalId) this.stop();

		this.#intervalId = setInterval(() => {
			this.#animationCount++;
			if (this.#animationCount > this.#maxAnimationCount) {
				this.#animationCount = 0;
				if (this.#isOnce) this.stop();
				if (this.#callback) this.#callback(arg);
			}
		}, this.#animateTime);

		this.#isPlay = true;
	}

	stop() {
		clearInterval(this.#intervalId);
		this.#intervalId = null;
		this.#isPlay = false;
	}

	draw() {
		if (this.#isPlay) {
			c.drawImage(
				this.#AnimationImages[this.#unitType.direction][
					this.#animationCount
				],
				!this.#animationOffset
					? this.#unitType.px
					: this.#unitType.px +
							this.#animationOffset[this.#unitType.direction][
								this.#animationCount
							][0],
				!this.#animationOffset
					? this.#unitType.py
					: this.#unitType.py +
							this.#animationOffset[this.#unitType.direction][
								this.#animationCount
							][1]
			);
		}
	}

	get isPlay() {
		return this.#isPlay;
	}

	static Builder() {
		return new (class {
			#name;
			#isOnce;
			#callback;
			#animateTime;
			#animationCount = 0;
			#animationOffset;
			#AnimationImages;
			#maxAnimationCount;
			#unitType;

			setName(name) {
				this.#name = name;
				return this;
			}

			setIsOnce(bool) {
				this.#isOnce = bool;
				return this;
			}

			setCallback(fn) {
				this.#callback = fn;
				return this;
			}

			/**
			 *
			 * @param {Sprit} unit
			 */
			setUnitType(unit) {
				this.#unitType = unit;
				return this;
			}

			setAnimateTime(time) {
				this.#animateTime = time;
				return this;
			}

			setAnimationOffset(offset) {
				this.#animationOffset = offset;
				return this;
			}

			/**
			 *
			 * @param {object} images
			 * @returns {this}
			 */
			setAnimationImages(images) {
				this.#AnimationImages = images;
				return this;
			}

			get name() {
				return this.#name;
			}

			get isOnce() {
				return this.#isOnce;
			}

			get unitType() {
				return this.#unitType;
			}

			get callback() {
				return this.#callback;
			}

			get animateTime() {
				return this.#animateTime;
			}

			get animationCount() {
				return this.#animationCount;
			}

			get animationOffset() {
				return this.#animationOffset;
			}

			get animationImages() {
				return this.#AnimationImages;
			}

			get maxAnimationCount() {
				return this.#maxAnimationCount;
			}

			build() {
				this.#maxAnimationCount = this.#AnimationImages.Left.length - 1;
				return new AnimationBuilder(this);
			}
		})();
	}
}
