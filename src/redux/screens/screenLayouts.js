/** @format */

import { ALL_BODY, HEADER_BODY_FOOT, BODY_FOOT, HEADER_BODY, SLIDER_HEADER_BODY } from "./layouts";

export const screenLayuts = {
	splash: {
		small: ALL_BODY,
		medium: ALL_BODY,
		large: ALL_BODY,
	},
	inicial: {
		small: HEADER_BODY,
		medium: HEADER_BODY,
		large: HEADER_BODY,
	},
	obra: {
		small: HEADER_BODY,
		medium: HEADER_BODY,
		large: HEADER_BODY,
	},
	trabajador: {
		small: ALL_BODY,
		medium: ALL_BODY,
		large: ALL_BODY,
	},
	empresa: {
		small: ALL_BODY,
		medium: ALL_BODY,
		large: ALL_BODY,
	},
	trabajadorFirma: {
		small: ALL_BODY,
		medium: ALL_BODY,
		large: ALL_BODY,
	},
	recibe: {
		small: ALL_BODY,
		medium: ALL_BODY,
		large: ALL_BODY,
	},
	recibeFirma: {
		small: ALL_BODY,
		medium: ALL_BODY,
		large: ALL_BODY,
	},
};

export const getLayout = (state) => {
	if (!state.screen.layouts[state.ui.media.size]) throw "no hay un layout definido en el state para media-size:" + state.ui.media.size;
	let layout = state.screen.layouts[state.ui.media.size];
	if (state.screen.layouts[state.ui.media.size][state.ui.media.orientation]) {
		layout = state.screen.layouts[state.ui.media.size][state.ui.media.orientation];
	}
	return layout;
};

export const isInLayout = (state, area) => {
	return getLayout(state).areas.find((a) => a == area);
};
