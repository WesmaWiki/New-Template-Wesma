/*jshint esversion:6*/
let can = document.querySelector(".tariff-order__ainm-canvas");

can.style.width = "100%";
can.style.height = "100%";
can.width = can.offsetWidth;
can.height = can.offsetHeight;

let ctx = can.getContext("2d");
function resize() {
	can.style.width = "100%";
	can.style.height = "100%";
	can.width = 0;
	can.height = 0;
	can.width = can.offsetWidth;
	can.height = can.offsetHeight;
}
const max_radius = 3;
const min_radius = 1;
const drag = 50;
window.onresize = function () {
	resize();
	cfill();
};
function cfill() {
	ctx.fillStyle = "transparent";
	ctx.fillRect(0, 0, can.width, can.height);
	ctx.fill();
}
let mouse = {
	x: -1000,
	y: -1000,
};
can.onmousemove = function (e) {
	mouse.x = e.layerX;
	mouse.y = e.layerY;
};
can.ontouchmove = function (e) {
	mouse.x = e.touches[0].clientX;
	mouse.y = e.touches[0].clientY;
};
resize();
cfill();

function distance(x, y, x1, y1) {
	return Math.sqrt((x1 - x) * (x1 - x) + (y1 - y) * (y1 - y));
}

class Particle {
	constructor(pos, target, vel, color, radius) {
		this.pos = pos;
		this.target = target;
		this.vel = vel;
		this.color = color;
		this.radius = radius;
		let arr = [-1, 1];
		this.direction = (arr[~~(Math.random() * 2)] * Math.random()) / 10;
	}
	set(type, value) {
		this[type] = value;
	}
	update() {
		this.radius += this.direction;
		this.vel.x = (this.pos.x - this.target.x) / drag;
		this.vel.y = (this.pos.y - this.target.y) / drag;
		if (distance(this.pos.x, this.pos.y, mouse.x, mouse.y) < 50) {
			//mess with the order of mouse and position to see some funky effects
			this.vel.x = (mouse.x - this.pos.x) / 15;
			this.vel.y = (mouse.y - this.pos.y) / 15;
		}
		if (this.radius >= max_radius) {
			this.direction *= -1;
		}
		if (this.radius <= 1) {
			this.direction *= -1;
		}
		this.pos.x -= this.vel.x;
		this.pos.y -= this.vel.y;
	}
	draw() {
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
		ctx.fill();
	}
}
let particles = [];
let colors = ["#bf1337", "#f3f1f3", "#084c8d", "#f2d108", "#efd282"];
let bool = true;
let current = 0,
	i;
function changeText(text) {
	let current = 0,
		temp,
		radius,
		color;
	cfill();
	ctx.fillStyle = "#fff";
	ctx.font = "120px Times";
	ctx.fillText(text, can.width * 0.5 - ctx.measureText(text).width * 0.5, can.height * 0.5 + 60);
	let data = ctx.getImageData(0, 0, can.width, can.height).data;
	console.log(data);
	cfill();
	for (i = 0; i < data.length; i += 8) {
		temp = { x: (i / 4) % can.width, y: ~~(i / 4 / can.width) };
		if (data[i] !== 0 && ~~(Math.random() * 5) == 1 /*(temp.x % (max_radius+1) === 0 && temp.y % (max_radius+1) === 0)*/) {
			if (data[i + 4] !== 0 || data[i - 4] !== 0 || data[i + can.width * 4] !== 0 || data[i - can.width * 4] !== 0) {
				if (current < particles.length) {
					particles[current].set("target", temp);
				} else {
					radius = max_radius - Math.random() * min_radius;
					temp = { x: Math.random() * can.width, y: Math.random() * can.height };
					if (bool) {
						temp = { x: (i / 4) % can.width, y: ~~(i / 4 / can.width) };
					}
					color = colors[~~(Math.random() * colors.length)];
					let p = new Particle(temp, { x: (i / 4) % can.width, y: ~~(i / 4 / can.width) }, { x: 0, y: 0 }, color, radius);
					particles.push(p);
				}
				++current;
			}
		}
	}
	bool = false;
	particles.splice(current, particles.length - current);
}
function draw() {
	cfill();
	for (i = 0; i < particles.length; ++i) {
		particles[i].update();
		particles[i].draw();
	}
}
changeText(">_<");
setInterval(draw, 1);
