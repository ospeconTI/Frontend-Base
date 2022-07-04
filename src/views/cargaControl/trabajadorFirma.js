/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { goTo, goHistoryPrev } from "../../redux/routing/actions";
import { isInLayout } from "@brunomon/template-lit/src/redux/screens/screenLayouts";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";
import { input } from "@brunomon/template-lit/src/views/css/input";
import { select } from "@brunomon/template-lit/src/views/css/select";
import { button } from "@brunomon/template-lit/src/views/css/button";
import { VIEWLIST, DELETE } from "../../../assets/icons/svgs";

const COLOR_PINCEL = "black";
const COLOR_FONDO = "white";
const GROSOR = 3;

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

export class trabajadorFirmaScreen extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
	constructor() {
		super();
		this.hidden = true;
		this.area = "body";
		this.current = "";

		this.canvas = null;
		this.contexto = null;
	}
	static get styles() {
		return css`
			${gridLayout}
			${input}
            ${select}
            ${button}
			:host {
				display: grid;
				position: relative;
				width: 100vw;
				height: 100vh;
				background-color: var(--aplicacion);
				grid-template-rows: 8vh 92vh;
			}
			:host([hidden]) {
				display: none;
			}
			#subtitulo {
				height: 100%;
				font-size: 1.4rem;
				background-color: var(--secundario);
				color: var(--on-secundario);
				padding: 0 0.5rem;
			}
			#subtitulo SVG {
				fill: var(--on-secundario);
				width: 1.8rem;
				height: 1.8rem;
			}
			#datos {
				height: 100%;
				padding: 0rem 1rem;
				grid-template-rows: 12fr 1fr 1fr;
				grid-gap: 0;
			}
			#firma {
				position: relative;
				height: 100%;
				grid-gap: 0;
				padding: 0;
			}
			#firma svg {
				fill: var(--on-formulario);
				width: 1.8rem;
				height: 1.8rem;
			}
			#delete-firma {
				position: absolute;
				top: 1rem;
				right: 0.1rem;
			}
			#canvas {
				border: solid 1px black;
				background-color: white;
				width: 100%;
				height: 96%;
				object-fit: cover;
			}
		`;
	}
	get _canvas() {
		return this.shadowRoot.querySelector("#canvas");
	}
	firstUpdated() {
		super.firstUpdated();
		this.canvas = this._canvas;
		this.contexto = this._canvas.getContext("2d");
		new ResizeObserver(this.cambioTamano.bind(this)).observe(this._canvas);
		//this.limpiarCanvas();
	}
	render() {
		return html`
			<div id="subtitulo" class="grid column">
				<div>Firma del trabajador</div>
				<div class="justify-self-end">${VIEWLIST}</div>
			</div>
			<div id="datos" class="grid row">
				<div id="firma" class="grid">
					<div id="delete-firma">${DELETE}</div>
					<canvas id="canvas"></canvas>
				</div>
				<div class="grid" style="padding:0;margin:0;">
					<button id="btnseguir" raised @click="${this.seguir}">NUEVO TRABAJADOR</button>
				</div>
				<div class="grid column" style="padding:0;margin:0;">
					<button id="btnvolver" flat @click="${this.volver}">VOLVER</button>
					<button id="btnFinal" flat @click="${this.final}">FINALIZAR</button>
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
			const SeMuestraEnUnasDeEstasPantallas = "-trabajadorFirma-".indexOf("-" + state.screen.name + "-") != -1;
			if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
				this.hidden = false;
				this.update();
			}
		}
	}
	cambioTamano() {
		if (this.canvas?.clientWidth) {
			this.canvas.width = 0;
			this.canvas.height = 0;
			this.canvas.width = this.canvas.clientWidth;
			this.canvas.height = this.canvas.clientHeight;
			this.contexto.fillStyle = COLOR_FONDO;
			this.contexto.fillRect(0, 0, this.canvas.width, this.canvas.height);
		}
	}
	seguir() {
		store.dispatch(goTo("trabajador"));
	}
	final() {
		store.dispatch(goTo("recibe"));
	}
	volver() {
		store.dispatch(goHistoryPrev());
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
window.customElements.define("trabajador-firma-screen", trabajadorFirmaScreen);
