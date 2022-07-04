/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { goTo, goHistoryPrev } from "../../redux/routing/actions";
import { isInLayout } from "@brunomon/template-lit/src/redux/screens/screenLayouts";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";
import { input } from "@brunomon/template-lit/src/views/css/input";
import { select } from "@brunomon/template-lit/src/views/css/select";
import { check } from "@brunomon/template-lit/src/views/css/check";
import { button } from "@brunomon/template-lit/src/views/css/button";
import { VIEWLIST, ADD, MODIF } from "../../../assets/icons/svgs";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

export class recibeScreen extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
	constructor() {
		super();
		this.hidden = true;
		this.area = "body";
		this.current = "";
	}
	static get styles() {
		return css`
			${gridLayout}
			${input}
            ${select}
            ${button}
            ${check}
			:host {
				display: grid;
				position: relative;
				height: 100%;
				width: 100%;
				background-color: var(--aplicacion);
				grid-auto-flow: row;
				align-content: flex-start;
				overflow-y: auto;
			}
			:host([hidden]) {
				display: none;
			}
			#subtitulo {
				height: fit-content;
				font-size: 1.4rem;
				background-color: var(--secundario);
				color: var(--on-secundario);
				padding: 0.5rem;
			}
			#subtitulo SVG {
				fill: var(--on-secundario);
				width: 1.8rem;
				height: 1.8rem;
			}
			#datos {
				height: auto;
				overflow-y: auto;
				padding: 1rem 1rem;
			}
			.titulo3 {
				font-size: 1.6rem;
			}
			hr {
				width: 100%;
			}
		`;
	}
	render() {
		return html`
			<div id="subtitulo" class="grid column">
				<div>Recibe por la empresa</div>
				<div class="justify-self-end">${VIEWLIST}</div>
			</div>
			<div id="datos" class="grid row align-start">
				<div class="titulo3">Seleccione la empresa</div>
				<!-- ------------------- -->
				<div class="select">
					<select id="empresa" required>
						<option value="" disabled selected>Selecciona una opción</option>
						<option value="1">Techint</option>
						<option value="2">Roggio</option>
					</select>
					<label for="empresa">Empresa</label>
					<label error>No puede ser vacio</label>
					<label subtext>Requerido</label>
				</div>
				<!-- ------------------- -->
				<div class="input">
					<textarea id="observaObra" rows="5"></textarea>
					<label for="observaObra">Observaciones</label>
					<label error>No puede ser vacio</label>
					<label subtext></label>
				</div>
				<!-- ------------------- -->
				<hr />
				<!-- ------------------- -->
				<div class="titulo3">Datos del receptor</div>
				<!-- ------------------- -->
				<div class="check">
					<input id="datosReceptor" type="checkbox" />
					<label for="datosReceptor">Sin receptor</label>
					<label></label>
				</div>
				<!-- ------------------- -->
				<div id="receptor" class="grid row" style="border: solid 1px var(--on-formulario-separador);">
					<div class="input">
						<input id="apellido" />
						<label for="apellido">Apelliido</label>
						<label error>No puede ser vacio</label>
						<label subtext>Requerido</label>
					</div>
					<!-- ------------------- -->
					<div class="input">
						<input id="nombre" />
						<label for="nombre">Nombre</label>
						<label error>No puede ser vacio</label>
						<label subtext>Requerido</label>
					</div>
					<!-- ------------------- -->
					<div class="select">
						<select id="cargo" required>
							<option value="" disabled selected>Selecciona una opción</option>
							<option value="1">Cargo 01</option>
							<option value="2">Cargo 02</option>
						</select>
						<label for="cargo">Cargo</label>
						<label error>No puede ser vacio</label>
						<label subtext>Requerido</label>
					</div>
					<!-- ------------------- -->
					<div class="input">
						<input id="dni" type="number" />
						<label for="dni">DNI</label>
						<label error>No puede ser vacio</label>
						<label subtext></label>
					</div>
					<!-- ------------------- -->
				</div>
				<div class="grid column" style="padding:0;margin: 1rem 0;">
					<button id="btnvolver" flat @click="${this.volver}">VOLVER</button>
					<button id="btnseguir" raised @click="${this.seguir}">SEGUIR</button>
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
			const SeMuestraEnUnasDeEstasPantallas = "-recibe-".indexOf("-" + state.screen.name + "-") != -1;
			if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
				this.hidden = false;
				this.update();
			}
		}
	}
	seguir() {
		store.dispatch(goTo("recibeFirma"));
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
window.customElements.define("recibe-screen", recibeScreen);
