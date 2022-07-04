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
import { VIEWLIST, ADD, MODIF } from "../../../assets/icons/svgs";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

export class empresaScreen extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
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
			#ver-empresa {
				grid-gap: 0;
				border: solid 1px var(--on-formulario);
			}
			#menu-empresa {
				width: fit-content;
				justify-self: flex-end;
				grid-gap: 2rem;
				padding: 0;
			}
			#menu-empresa svg {
				fill: var(--on-formulario);
				width: 1.8rem;
				height: 1.8rem;
			}
			#dato-empresa {
				border: solid 1px var(--on-formulario);
			}
		`;
	}
	render() {
		return html`
			<div id="subtitulo" class="grid column">
				<div>Empresa</div>
				<div class="justify-self-end">${VIEWLIST}</div>
			</div>
			<div id="datos" class="grid row align-start">
				<!-- ------------------- -->
				<div id="ver-empresa" class="grid row">
					<div id="menu-empresa" class="grid column">
						<div>${ADD}</div>
						<div>${MODIF}</div>
					</div>
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
				</div>
				<!-- ------------------- -->
				<div id="dato-empresa" class="grid row">
					<!-- ------------------- -->
					<div class="input">
						<input id="razonsocial" />
						<label for="razonsocial">Razon social</label>
						<label error>No puede ser vacio</label>
						<label subtext>Requerido</label>
					</div>
					<!-- ------------------- -->
					<div class="input">
						<input id="cuit" />
						<label for="cuit">CUIT (opcion 11111111113)</label>
						<label error>No puede ser vacio</label>
						<label subtext>Requerido</label>
					</div>
					<!-- ------------------- -->
					<div class="select">
						<select id="caracter" required>
							<option value="" disabled selected>Selecciona una opción</option>
							<option value="1">caracter 1</option>
							<option value="2">caracter 1</option>
						</select>
						<label for="caracter">Caracter</label>
						<label error>No puede ser vacio</label>
						<label subtext>Requerido</label>
					</div>
					<!-- ------------------- -->
					<div class="input">
						<input id="domicilio" />
						<label for="domicilio">Domicilio legal</label>
						<label error>No puede ser vacio</label>
						<label subtext>Requerido</label>
					</div>
					<!-- ------------------- -->
					<div class="select">
						<select id="provincia" required>
							<option value="" disabled selected>Selecciona una opción</option>
							<option value="1">Bs As</option>
							<option value="2">Cordoba</option>
						</select>
						<label for="provincia">Provincia</label>
						<label error>No puede ser vacio</label>
						<label subtext>Requerido</label>
					</div>
					<!-- ------------------- -->
					<div class="select">
						<select id="localidad" required>
							<option value="" disabled selected>Selecciona una opción</option>
							<option value="1">San Martin</option>
							<option value="2">Dolores</option>
						</select>
						<label for="localidad">Localidad</label>
						<label error>No puede ser vacio</label>
						<label subtext>Requerido</label>
					</div>
					<div class="grid column" style="padding:0;margin: 1rem 0;">
						<button id="btncancelar" flat @click="${this.volver}">CANCELAR</button>
						<button id="btngrabar" flat @click="${this.seguir}">GRABAR</button>
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
			const SeMuestraEnUnasDeEstasPantallas = "-empresa-".indexOf("-" + state.screen.name + "-") != -1;
			if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
				this.hidden = false;
				this.update();
			}
		}
	}
	seguir() {
		store.dispatch(goTo("trabajadorFirma"));
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
window.customElements.define("empresa-screen", empresaScreen);
