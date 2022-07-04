import { showSpinner, hideSpinner } from "@brunomon/template-lit/src/redux/ui/actions";
export const fetchGeolocalizacion = (dispatch, successAction, errorAction) => {
	if (navigator.geolocation) {
		dispatch(showSpinner());
		navigator.geolocation.getCurrentPosition(showPosition, showError);
	} else {
		var j = {
			latitud: 0,
			longitud: 0,
		};
	}

	function showPosition(position) {
		dispatch(hideSpinner());
		var j = {
			latitud: position.coords.latitude,
			longitud: position.coords.longitude,
		};
		dispatch({
			type: successAction,
			payload: {
				send: 1,
				receive: j,
			},
		});
	}

	function showError(error) {
		dispatch(hideSpinner());
		switch (error.code) {
			case error.PERMISSION_DENIED:
				//x.innerHTML = "User denied the request for Geolocation.";
				break;
			case error.POSITION_UNAVAILABLE:
				//x.innerHTML = "Location information is unavailable.";
				break;
			case error.TIMEOUT:
				//x.innerHTML = "The request to get user location timed out.";
				break;
			case error.UNKNOWN_ERROR:
				//x.innerHTML = "An unknown error occurred.";
				break;
		}
		var j = {
			latitud: 0,
			longitud: 0,
		};
		dispatch({
			type: errorAction,
			payload: {
				send: 1,
				receive: j,
			},
		});
	}
};
