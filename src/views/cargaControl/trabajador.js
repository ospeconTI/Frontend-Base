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
import { VIEWLIST } from "../../../assets/icons/svgs";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

export class trabajadorScreen extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
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
				padding: 1rem 2rem;
			}
		`;
	}
	render() {
		return html`
			<div id="subtitulo" class="grid column">
				<div>Nuevo trabajador</div>
				<div class="justify-self-end">${VIEWLIST}</div>
			</div>
			<div id="datos" class="grid row align-start">
				<!-- ------------------- -->
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
					<select id="documentoTipo" required>
						<option value="" disabled selected>Selecciona una opción</option>
						<option value="1">DNI</option>
						<option value="2">CI</option>
					</select>
					<label for="documentoTipo">Tipo de documento</label>
					<label error>No puede ser vacio</label>
					<label subtext>Requerido</label>
				</div>
				<!-- ------------------- -->
				<div class="input">
					<input id="documentoNumero" type="number" />
					<label for="documentoNumero">Numero dee documento</label>
					<label error>No puede ser vacio</label>
					<label subtext>Requerido</label>
				</div>
				<!-- ------------------- -->
				<div class="select">
					<select id="categoria" required>
						<option value="" disabled selected>Selecciona una opción</option>
						<option value="1">Categoria Uno</option>
						<option value="2">categoria Dos</option>
					</select>
					<label for="categoria">Categoria</label>
					<label error>No puede ser vacio</label>
					<label subtext>Requerido</label>
				</div>
				<!-- ------------------- -->
				<div class="input">
					<input id="sueldo" type="number" />
					<label for="sueldo">Sueldo</label>
					<label error>No puede ser vacio</label>
					<label subtext></label>
				</div>
				<!-- ------------------- -->
				<div class="select">
					<select id="antiguedadEmpresa" required>
						<option value="" disabled selected>Selecciona una opción</option>
						<option value="1">Menos de un año</option>
						<option value="2">Mas de un año</option>
					</select>
					<label for="antiguedadEmpresa">Antiguedad en la empresa</label>
					<label error>No puede ser vacio</label>
					<label subtext>Requerido</label>
				</div>
				<!-- ------------------- -->
				<div class="input">
					<input id="fechaIngreso" type="date" />
					<label for="fechaIngreso">Fecha de ingreso</label>
					<label error>No puede ser vacio</label>
					<label subtext></label>
				</div>
				<!-- ------------------- -->
				<div class="select">
					<select id="nacionalidad" required>
						<option value="" disabled selected>Selecciona una opción</option>
						<option value="1">Argentino</option>
						<option value="2">Extranjero</option>
					</select>
					<label for="nacionalidadnacionalidad">Nacionalidad</label>
					<label error>No puede ser vacio</label>
					<label subtext>Requerido</label>
				</div>
				<!-- ------------------- -->
				<div class="select">
					<select id="horasDia" required>
						<option value="" disabled selected>Selecciona una opción</option>
						<option value="1">Menos de 8</option>
						<option value="2">Mas de 8</option>
					</select>
					<label for="horasDia">Horas por dia</label>
					<label error>No puede ser vacio</label>
					<label subtext>Requerido</label>
				</div>
				<!-- ------------------- -->
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
			const SeMuestraEnUnasDeEstasPantallas = "-trabajador-".indexOf("-" + state.screen.name + "-") != -1;
			if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
				this.hidden = false;
				this.update();
			}
		}
	}
	seguir() {
		store.dispatch(goTo("empresa"));
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
window.customElements.define("trabajador-screen", trabajadorScreen);
