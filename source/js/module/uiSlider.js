import noUiSlider from "nouislider";

export function UiSlider () {
	let elNoUiSlider = document.querySelector(".nouislider-container");

	if (elNoUiSlider != null) {
		let inputSliderOne = document.querySelector(".from-tariff-order__price-ipnut.--one");
		let inputSliderTwo = document.querySelector(".from-tariff-order__price-ipnut.--two");
		let inputsSlider = [inputSliderOne, inputSliderTwo];
		let minValue = parseInt(inputSliderOne.dataset.minValue);
		let maxValue = parseInt(inputSliderTwo.dataset.maxValue);

		noUiSlider.create(elNoUiSlider, {
			start: [minValue, maxValue],
			connect: true,
			step: 1000,
			tooltips: true,
			format: {
				to: function (value) {
					return Math.round(value);
				},
				from: function (value) {
					return Number(Math.round(value));
				},
			},

			range: {
				min: minValue,
				max: maxValue,
			},
		});

		elNoUiSlider.noUiSlider.on("update", function (values, handle) {
			inputsSlider[handle].value = (handle == 0 && minValue != values[handle]) || (handle == 1 && maxValue != values[handle]) ? Math.round(values[handle]) : "";
		});
	}
};