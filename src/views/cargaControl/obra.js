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

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

export class obraScreen extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
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
			#datos {
				height: auto;
				overflow-y: auto;
				padding: 1rem 2rem;
			}
			#btnseguir {
				height: 4rem;
				margin: 1rem 0;
			}
		`;
	}
	render() {
		return html`
			<div id="subtitulo">Nueva obra</div>
			<div id="datos" class="grid row align-start">
				<!-- ------------------- -->
				<div class="input">
					<input id="obra" />
					<label for="obra">Direccion de obra</label>
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
				<!-- ------------------- -->
				<div class="select">
					<select id="tipoObra" required>
						<option value="" disabled selected>Selecciona una opción</option>
						<option value="1">Tipo Uno</option>
						<option value="2">Tipo Dos</option>
					</select>
					<label for="tipoObra">Tipo de obra</label>
					<label error>No puede ser vacio</label>
					<label subtext>Requerido</label>
				</div>
				<!-- ------------------- -->
				<div class="select">
					<select id="etapaObra" required>
						<option value="" disabled selected>Selecciona una opción</option>
						<option value="1">Etapa Uno</option>
						<option value="2">Etapa Dos</option>
					</select>
					<label for="etapaObra">Etapa de obra</label>
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
				<button id="btnseguir" raised @click="${this.seguir}">SEGUIR</button>
				<button id="btnfoto" flat>FOTOS</button>
				<div class="grid column" style="padding:0;margin: 1rem 0;">
					<button id="btncancelar" flat @click="${this.volver}">CANCELAR</button>
					<button id="btnoobstrcciino" flat>OBSTRUCCION</button>
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
			const SeMuestraEnUnasDeEstasPantallas = "-obra-".indexOf("-" + state.screen.name + "-") != -1;
			if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
				this.hidden = false;
				this.update();
			}
		}
	}
	seguir() {
		store.dispatch(goTo("trabajador"));
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
window.customElements.define("obra-screen", obraScreen);
