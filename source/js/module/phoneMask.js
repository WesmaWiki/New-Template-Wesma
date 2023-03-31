// //phoneMask

// export function phoneMask() {
// 	Inputmask({
// 		mask: "+7 (Z99) 999-99-99",
// 		definitions: {
// 			Z: {
// 				validator: "[0-6,9]",
// 			},
// 		},
// 	}).mask('[type="tel"]');
// }
import Inputmask from "inputmask";
import intlTelInput from "intl-tel-input";

export function phoneMask() {
	const input = document.querySelectorAll('[type="tel"]');

	input.forEach((element) => {
		if (!element.classList.contains("mask-tel")) {
			let iti_el = element.querySelectorAll(".iti.iti--allow-dropdown.iti--separate-dial-code");
			if (iti_el.length) {
				iti.destroy();
			}
			for (let i = 0; i < input.length; i++) {
				let iti = intlTelInput(input[i], {
					autoHideDialCode: false,
					autoPlaceholder: "aggressive",
					initialCountry: "ru",
					separateDialCode: true,
					preferredCountries: ["ru"],
					customPlaceholder: function (selectedCountryPlaceholder, selectedCountryData) {
						let dialCodeEscape = [...selectedCountryData.dialCode].map((el) => "\\" + el).join("");
						let placetel = selectedCountryData.dialCode === "7" ? "+7 (Z99) 999-99-99" : `+${dialCodeEscape} ` + selectedCountryPlaceholder.replace(/[0-9]/g, "9");
						Inputmask({
							clearMaskOnLostFocus: false,
							definitions: {
								Z: {
									validator: "[0-6,9]",
								},
							},
							mask: placetel,
						}).mask(input[i]);
						return "";
					},
					utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.0.0/js/utils.js",
				});

				element.classList.add("mask-tel");
			}
		}
	});
}
