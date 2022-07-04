/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../redux/store";
import { connect } from "@brunomon/helpers";
import { goTo } from "../redux/routing/actions";
import { isInLayout } from "@brunomon/template-lit/src/redux/screens/screenLayouts";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";
import { cargar as getGeolocalizacion } from "../redux/geolocalizacion/actions";
import { OLComponent } from "./componentes/ol-map";
import { POINT } from "../../assets/icons/svgs";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

const GEO_OK = "geolocalizacion.cargarTimeStamp";
const GEO_ERROR = "geolocalizacion.errorTimeStamp";

export class inicialScreen extends connect(store, GEO_OK, GEO_ERROR, MEDIA_CHANGE, SCREEN)(LitElement) {
	constructor() {
		super();
		this.hidden = true;
		this.area = "body";
		this.current = "";
		this.puntos = [];
		this.puntos[0] = [0, 0, "Yo", "Mi Ubicacion", "S"];
	}
	static get styles() {
		return css`
			:host {
				display: grid;
				position: relative;
				height: 100%;
				width: 100%;
				background-color: var(--aplicacion);
				grid-template-rows: max-content auto;
			}
			:host([hidden]) {
				display: none;
			}
			#mensaje {
				background-color: var(--error);
				font-size: 1rem;
				color: var(--aplicacion);
				padding: 0.6rem 0;
				text-align: center;
			}
			.panel {
				display: grid;
				position: relative;
				width: 100vw;
				height: 100%;
				overflow-y: auto;
				justify-self: center;
				align-self: center;
				border: solid 1px grey;
			}
			.map {
				height: 100%;
			}
			#point {
				display: none;
				position: absolute;
				right: 0.2rem;
				top: 0.2rem;
				z-index: 99;
			}
			#point svg {
				width: 1.8rem;
				height: 1.8rem;
				fill: grey;
			}
			#cartel {
				display: none;
				position: absolute;
				right: 1rem;
				bottom: 0.5rem;
				border: solid 1px black;
				padding: 0.2rem 0.4rem;
				background-color: rgba(255, 255, 255, 0.66);
				font-size: 1rem;
			}
		`;
	}
	render() {
		return html`
			<div id="mensaje">Hay controles de obras pendientes de transferir</div>
			<div class="panel">
				<div id="point" @click=${this.posicionar}>${POINT}</div>
				<ol-map id="map" class="map" media-size="${this.mediaSize}" .puntos=${this.puntos}> </ol-map>
				<div id="cartel" class="grid row">
					<div>Usted esta:</div>
					<div id="latitud">"Latitud: "</div>
					<div id="longitud">"Longitud: "</div>
				</div>
			</div>
		`;
	}
	stateChanged(state, name) {
		if (name == SCREEN || name == MEDIA_CHANGE) {
			this.mediaSize = state.ui.media.size;
			this.hidden = true;
			this.current = state.screen.name;
			const haveBodyArea = isInLayout(state, this.area);
			const SeMuestraEnUnasDeEstasPantallas = "-inicial-".indexOf("-" + state.screen.name + "-") != -1;
			if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
				this.hidden = false;
				store.dispatch(getGeolocalizacion());
				this.update();
			}
		}
		if (name == GEO_OK) {
			const myPosition = [state.geolocalizacion.longitud, state.geolocalizacion.latitud, "Yo", "Mi Ubicacion", "S"];
			this.puntos[0] = myPosition;
			this.shadowRoot.querySelector("#point").style.display = "grid";
			this.shadowRoot.querySelector("#cartel").style.display = "grid";
			this.shadowRoot.querySelector("#latitud").innerHTML = "Latitud: " + state.geolocalizacion.latitud;
			this.shadowRoot.querySelector("#longitud").innerHTML = "Longitud: " + state.geolocalizacion.longitud;
			this.update();
		}
	}
	posicionar() {
		this.shadowRoot.querySelector("#point").style.display = "none";
		this.shadowRoot.querySelector("#cartel").style.display = "none";
		store.dispatch(getGeolocalizacion());
	}
	static get properties() {
		return {
			mediaSize: {
				type: String,
				reflect: true,
				attribute: "media-size",
			},
			layout: {
				type: String,
				reflect: true,
			},
			hidden: {
				type: Boolean,
				reflect: true,
			},
			area: {
				type: String,
			},
			current: {
				type: String,
				reflect: true,
			},
		};
	}
}
window.customElements.define("inicial-screen", inicialScreen);
