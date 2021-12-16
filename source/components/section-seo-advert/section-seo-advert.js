document.addEventListener(
	"DOMContentLoaded",
	function () {
		let sectionSeoAdvert = document.querySelector(".advert-anim");

		if (sectionSeoAdvert != null) {
			let mouseX = document.documentElement.clientWidth / 2;
			let mouseY = document.documentElement.clientHeight / 2;

			sectionSeoAdvert.addEventListener("mousemove", function (e) {
				mouseX = e.clientX;
				mouseY = e.clientY;
			});

			let base = document.querySelector(".advert-anim__back-base.--em");

			if (base != null) {
				let xp = 0;
				let yp = 0;

				let loopInterval = setInterval(function () {
					xp += (mouseX - xp) / 30;
					yp += (mouseY - yp) / 30;

					base.style.left = xp + "px";
					base.style.top = yp + "px";
				}, 30);
			}
		}

		let canvas = document.querySelector(".seo-advert__canvas");
		let ctx = canvas.getContext("2d");
		ctx.imageSmoothingEnabled = false;

		canvas.style.width = "100%";
		canvas.style.height = "100%";
		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;

		window.addEventListener("resize", function () {
			canvas.style.width = "100%";
			canvas.style.height = "100%";
			canvas.width = 0;
			canvas.height = 0;
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;
		});

		/* animation settings */
		let raf, decraf;

		/* blob settings */
		let blobs = [],
			gravity = 0.02,
			decay = 1,
			decayRate = 0.997,
			decayInrease = 0.05;

		/* space settings */
		let space = {
			width: canvas.width,
			height: canvas.height,
			ratio: canvas.width / canvas.clientWidth,
			midX: canvas.width / 2,
			midY: canvas.height / 2,
			sqr: (canvas.width / 2) * (canvas.height / 2),
		};

		/* blob sizes */
		let sizes = [65, 30, 25, 22, 16, 10, 9, 6, 5, 4, 3, 2, 2, 1, 1, 1];

		/* blob constructor */
		function blob(radius) {
			this.x = space.width * Math.random() - space.midX;
			this.y = space.height * Math.random() - space.midY;
			this.mx = 0;
			this.my = 0;
			this.radius = radius;
		}

		/* gradients */
		let radgrad;

		/* function to calculate node distance from center of canvas */
		let center_distance = function (x, y) {
			let squared = Math.pow(x, 2) + Math.pow(y, 2);
			let hypoteneus = 0.2 * Math.sqrt(squared);

			return hypoteneus;
		};

		/* generate blobs from constructor */
		for (i = 0; i < sizes.length; i++) {
			blobs[i] = new blob(sizes[i]);
			blobs[i].max = center_distance(blobs[i].x, blobs[i].y);
		}

		function animate() {
			ctx.clearRect(0, 0, space.width, space.height);
			decay *= decayRate;

			/* ensure decay rate never reahes too low a value */
			decay = decay < 0.1 ? 0.1 : decay;

			for (i = 0; i < blobs.length; i++) {
				let _x = blobs[i].x * decay,
					_y = blobs[i].y * decay,
					x = space.midX + _x,
					y = space.midY + _y,
					c = blobs[i].max - center_distance(_x, _y),
					r = 0.6 * Math.abs(blobs[i].radius + c);

				/* draw gradients */
				radgrad = ctx.createRadialGradient(x, y, 0, x, y, r);
				radgrad.addColorStop(1, "rgba(0,0,0,1)");
				radgrad.addColorStop(1, "rgba(0,0,0,0.1)");
				radgrad.addColorStop(1, "rgba(0,0,0,1)");

				ctx.beginPath();
				ctx.fillStyle = radgrad;
				ctx.arc(x, y, r, 0, 2 * Math.PI, false);
				ctx.closePath();
				ctx.fill();

				/* x-axis gravity */
				if (x < space.midX) {
					blobs[i].mx += gravity;
				} else {
					blobs[i].mx -= gravity;
				}

				/* y-axis gravity */
				if (y < space.midY) {
					blobs[i].my += gravity;
				} else {
					blobs[i].my -= gravity;
				}

				/* new position */
				blobs[i].x += blobs[i].mx;
				blobs[i].y += blobs[i].my;
			}
			raf = window.requestAnimationFrame(animate);
		}
		animate();

		function increase_delay() {
			if (decay < 1) {
				decayRate = 1.1;

				decraf = window.requestAnimationFrame(increase_delay);
			} else {
				decayRate = 0.997;
			}
		}

		canvas.addEventListener("click", function () {
			window.cancelAnimationFrame(decay);
			increase_delay();
		});
	},
	false
);
