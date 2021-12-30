window.onload = () => {
	let $canvas = document.querySelector(".portfolio-task__canvas");

	if ($canvas != null) {
		class Tree {
			constructor(startPoint, config) {
				this.startPoint = startPoint;
				this.config = config;
				this.lines = [];
			}

			toRad(a) {
				return (Math.PI / 180) * a;
			}

			toAngle(x, y, a, len) {
				if (typeof x === "object") {
					len = a;
					a = y;
					y = x.y;
					x = x.x;
				}
				let ret = {
					x: x + len * Math.cos(this.toRad(a)),
					y: y + len * Math.sin(this.toRad(a)),
				};

				return ret;
			}

			translateToCanvas(x, y) {
				let i;
				let j;

				i = params.width / 2 + x;
				j = params.height / 2 - y + 1;
				return {
					i: i,
					j: j,
				};
			}

			//TODO: use setters
			setConfig(newConfig) {
				this.config = newConfig;
			}

			calculate() {
				let initialFrom = this.toAngle(this.startPoint, 90, this.config.initialLength);
				this.lines = [];
				for (let i = 0; i <= this.config.levels - 1; i++) {
					this.lines.push([]);
				}
				//TODO maybe have the line structure in place, and only update the coords might be faster
				this.lines[0].push({
					from: this.startPoint,
					to: initialFrom,
					level: 1,
				});

				//recursive computation of line coordinates
				let doTreeR = (point, prevAngle, prevLength, lvl) => {
					//if we readched the maximul level, exit the branch
					if (lvl > this.config.levels) return;
					let len = prevLength * this.config.lengthRatio;
					let lenRight = len * this.config.lengthLeftRightRatio;
					//len = prevLength - 4;
					let leftAngle = prevAngle - this.config.angle;
					let rightAngle = prevAngle + this.config.angle;
					let leftTo = this.toAngle(point, leftAngle, len);
					let rightTo = this.toAngle(point, rightAngle, lenRight);

					//push left branch
					this.lines[lvl - 1].push({
						from: point,
						to: leftTo,
						level: lvl,
					});

					//push right branch
					this.lines[lvl - 1].push({
						from: point,
						to: rightTo,
						level: lvl,
					});

					doTreeR(leftTo, leftAngle, len, lvl + 1);
					doTreeR(rightTo, rightAngle, len, lvl + 1);
				};
				//start the recursive calculation
				doTreeR(initialFrom, 90, this.config.initialLength, 2);
			}
			draw(ctx) {
				//draw based on previous line calculation
				ctx.clearRect(0, 0, params.width, params.height);

				ctx.shadowColor = "red"; //a bit of red glow
				ctx.shadowBlur = 4;
				ctx.lineCap = "round";
				ctx.globalCompositeOperation = "lighter";

				for (let i = this.lines.length - 1; i >= 0; i--) {
					let lvl = this.lines[i];
					let lvlLength = lvl.length;
					let l = ((i + 1) / this.config.levels) * 40 + 30;
					ctx.lineWidth = ((this.config.levels - i) / this.config.levels) * 5;

					lvl.forEach((line, idx) => {
						idx = idx + 1;
						//color, cycle through 0->360 based on the index in the level
						let c = 270 - (idx / lvlLength) * 270;

						let from = this.translateToCanvas(line.from.x, line.from.y);
						let to = this.translateToCanvas(line.to.x, line.to.y);

						ctx.beginPath();

						ctx.strokeStyle = `hsl(${c}, 90%, ${l}%)`;

						ctx.moveTo(from.i, from.j);
						ctx.lineTo(to.i, to.j);

						ctx.stroke();
					});
				}
			}
		}

		let ctx = $canvas.getContext("2d");

		$canvas.style.width = "100%";
		$canvas.style.height = "100%";
		$canvas.width = $canvas.offsetWidth;
		$canvas.height = $canvas.offsetHeight;

		let params = {
			width: $canvas.offsetWidth, //same as dom
			height: $canvas.offsetHeight, //same as dom
		};

		window.addEventListener("resize", function () {
			params.width = $canvas.offsetWidth;
			params.height = $canvas.offsetHeight;

			$canvas.style.width = "100%";
			$canvas.style.height = "100%";
			$canvas.width = 0;
			$canvas.height = 0;
			$canvas.width = $canvas.offsetWidth;
			$canvas.height = $canvas.offsetHeight;
		});

		let randomizer = {
			prevTime: 0,
			diff: 0,
			pos: 0,
			dir: 1,
			paused: true,
			tick: function () {
				if (this.paused) return;
				let now = new Date();
				let nowMS = now.getTime();
				let nowS = Math.floor(nowMS / 1000);

				if (this.prevTime === 0) {
					this.diff = 0;
					this.prevTime = nowMS;
					return;
				} else {
					this.diff = nowMS - this.prevTime;
				}
				this.prevTime = nowMS;

				let totalTime = 3000; //seconds
				let diff = this.diff / totalTime;
				let pos = this.pos + diff * this.dir;

				if (pos > 1) {
					pos = 1 - pos / 10;
					this.dir = -1;
				}
				if (pos < 0) {
					pos = pos / 10;
					this.dir = 1;
				}
				config.treeConfig.angle = pos * 70;
				this.pos = pos;
			},
			start: function () {
				this.paused = false;
			},
			stop: function () {
				this.prevTime = 0;
				this.diff = 0;
				this.pos = 0;
				this.dir = 1;
				this.paused = true;
			},
		};

		let config = {
			treeStartPoint: {
				x: 0,
				y: -300,
			},

			treeConfig: {
				angle: 20,
				levels: 8,
				initialLength: 120,
				lengthRatio: 0.86,
				lengthLeftRightRatio: 1,
			},
		};

		let tree = new Tree(config.treeStartPoint, config.treeConfig);

		let loop = () => {
			tree.setConfig(config.treeConfig);

			randomizer.tick();

			tree.calculate();
			tree.draw(ctx);
			requestAnimationFrame(loop);
		};
		randomizer.start(); //start the animation by default
		loop();

		let runToId = null;

		$canvas.addEventListener("mousemove", (ev) => {
			let $b = document.querySelector("body");
			let bodyW = params.width;
			let bodyH = params.height;
			// console.log(ev);
			let x = ev.offsetX;
			let y = ev.offsetY;

			config.treeConfig.angle = (y / bodyH) * 70;
			config.treeConfig.lengthLeftRightRatio = 1;
			randomizer.stop();
			// clearTimeout(runToId);
		});

		$canvas.addEventListener("mouseleave", (ev) => {
			runToId = setTimeout(() => randomizer.start(), 0);
		});
	}
};
