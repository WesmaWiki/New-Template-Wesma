const firstNames = ["увеличить конверсию", "сделать редизайн", "приобрести лицензии", "подключиться по API к сервису", "сделать синхронизацию с OZON, Wildberries, Маркет"];

const getRandomNumber = (max) => Math.floor(Math.random() * max);

const getRandomName = () => `${firstNames[getRandomNumber(firstNames.length)]}`;

if (document.getElementById("random-phrase") != null) {
	setInterval(function () {
		document.getElementById("random-phrase").innerText = getRandomName();
	}, 2000);
}
