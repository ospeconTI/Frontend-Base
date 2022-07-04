import { CARGAR_SUCCESS, CARGAR_ERROR } from "./actions";

const initialState = {
	latitud: 0,
	longitud: 0,
	cargarTimeStamp: null,
	errorTimeStamp: null,
};

export const reducer = (state = initialState, action) => {
	const newState = {
		...state,
	};

	switch (action.type) {
		case CARGAR_SUCCESS:
			if (action.payload.receive.latitud != 0 && action.payload.receive.longitud != 0) {
				newState.latitud = action.payload.receive.latitud;
				newState.longitud = action.payload.receive.longitud;
				newState.cargarTimeStamp = new Date().getTime();
			}
			break;
		case CARGAR_ERROR:
			newState.errorTimeStamp = new Date().getTime();
			break;
	}
	return newState;
};
