//phoneMask
import Inputmask from "inputmask";

export function phoneMask() {
	Inputmask({
		mask: "+7 (Z99) 999-99-99",
		definitions: {
			Z: {
				validator: "[0-6,9]",
			},
		},
	}).mask('[type="tel"]');
}
