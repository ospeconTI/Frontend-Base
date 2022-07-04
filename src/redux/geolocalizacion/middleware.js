import { CARGAR, CARGAR_SUCCESS, CARGAR_ERROR } from "./actions";

import { fetchGeolocalizacion } from "../../libs/fetchGeolocalizacion";

export const cargar =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type == CARGAR) {
			fetchGeolocalizacion(dispatch, CARGAR_SUCCESS, CARGAR_ERROR);
		}
	};

export const middleware = [cargar];
