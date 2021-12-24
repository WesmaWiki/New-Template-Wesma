// // const firstNames = ["увеличить конверсию", "сделать редизайн", "приобрести лицензии", "подключиться по API к сервису", "сделать синхронизацию с OZON, Wildberries, Маркет"];

// // const getRandomNumber = (max) => Math.floor(Math.random() * max);

// // const getRandomName = () => `${firstNames[getRandomNumber(firstNames.length)]}`;

// // if (document.getElementById("random-phrase") != null) {
// // 	setInterval(function () {
// // 		document.getElementById("random-phrase").innerText = getRandomName();
// // 	}, 2000);
// // }

// /*
// 	This pen cleverly utilizes SVG filters to create a "Morphing Text" effect. Essentially, it layers 2 text elements on top of each other, and blurs them depending on which text element should be more visible. Once the blurring is applied, both texts are fed through a threshold filter together, which produces the "gooey" effect. Check the CSS - Comment the #container rule's filter out to see how the blurring works!
// */

// const elts = {
// 	text1: document.querySelector(".random-phrase__text1"),
// 	text2: document.querySelector(".random-phrase__text2")
// };

// // The strings to morph between. You can change these to anything you want!
// const texts = [
// 	"увеличить конверсию",
// 	"сделать редизайн",
// 	"приобрести лицензии",
// 	"подключиться по API к сервису",
// 	"сделать синхронизацию с OZON, Wildberries, Маркет"
// ];

// // Controls the speed of morphing.
// const morphTime = 1;
// const cooldownTime = 1;

// let textIndex = texts.length - 1;
// let time = new Date();
// let morph = 0;
// let cooldown = cooldownTime;

// elts.text1.textContent = texts[textIndex % texts.length];
// elts.text2.textContent = texts[(textIndex + 1) % texts.length];

// function doMorph() {
// 	morph -= cooldown;
// 	cooldown = 0;

// 	let fraction = morph / morphTime;

// 	if (fraction > 1) {
// 		cooldown = cooldownTime;
// 		fraction = 1;
// 	}

// 	setMorph(fraction);
// }

// // A lot of the magic happens here, this is what applies the blur filter to the text.
// function setMorph(fraction) {
// 	// fraction = Math.cos(fraction * Math.PI) / -2 + .5;

// 	elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
// 	elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

// 	fraction = 1 - fraction;
// 	elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
// 	elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

// 	elts.text1.textContent = texts[textIndex % texts.length];
// 	elts.text2.textContent = texts[(textIndex + 1) % texts.length];
// }

// function doCooldown() {
// 	morph = 0;

// 	elts.text2.style.filter = "";
// 	elts.text2.style.opacity = "100%";

// 	elts.text1.style.filter = "";
// 	elts.text1.style.opacity = "0%";
// }

// // Animation loop, which is called every frame.
// function animate() {
// 	requestAnimationFrame(animate);

// 	let newTime = new Date();
// 	let shouldIncrementIndex = cooldown > 0;
// 	let dt = (newTime - time) / 1000;
// 	time = newTime;

// 	cooldown -= dt;

// 	if (cooldown <= 0) {
// 		if (shouldIncrementIndex) {
// 			textIndex++;
// 		}

// 		doMorph();
// 	} else {
// 		doCooldown();
// 	}
// }

// // Start the animation.
// animate();
