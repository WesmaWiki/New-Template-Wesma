import { _slideUp } from "./slideUp";
import { _slideDown } from "./slideDown";

export let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
};
