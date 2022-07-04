/** @format */

import { html, LitElement, css } from "lit";
import { connect } from "@brunomon/helpers";
import { store } from "../redux/store";
import { layoutsCSS } from "../views/ui/layouts";
import { getLayout } from "../redux/screens/screenLayouts";
import { goTo } from "../redux/routing/actions";
import { formTest } from "./componentes/formTest";
import { menuPrincipal } from "./headers/menu";
import { spinner } from "@brunomon/template-lit/src/views/css/spinner";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";

import { splashScreen } from "./splash/splash";
import { inicialScreen } from "./inicial";
import { obraScreen } from "./cargaControl/obra";
import { trabajadorScreen } from "./cargaControl/trabajador";
import { empresaScreen } from "./cargaControl/empresa";
import { trabajadorFirmaScreen } from "./cargaControl/trabajadorFirma";
import { recibeScreen } from "./cargaControl/recibe";
import { recibeFirmaScreen } from "./cargaControl/recibeFirma";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const SELECTION = "ui.menu.timeStamp";
const SPINNER = "ui.spinner.loading";

export class viewManager extends connect(store, SPINNER, MEDIA_CHANGE, SCREEN, SELECTION)(LitElement) {
	constructor() {
		super();
		window.onpopstate = (event) => {
			if (event.state) {
				store.dispatch(goTo(event.state.option, true));
			} else {
				window.history.back();
			}
		};
	}

	static get styles() {
		return css`
			${layoutsCSS}
			${gridLayout}
            ${spinner}
            :host {
				display: grid;
				padding: 0;
				background-color: var(--aplicacion);
				overflow: hidden;
			}

			:host::-webkit-scrollbar {
				width: 0.5vw;
				cursor: pointer;
			}
			:host::-webkit-scrollbar([media-size="small"]) {
				display: none;
			}
			:host::-webkit-scrollbar-thumb {
				background: var(--secundario);
				border-radius: 5px;
			}
		`;
	}

	render() {
		return html`
			<div class="spinner" aro fixed hidden></div>
			<menu-principal area="header"></menu-principal>
			<!-- <form-test area="body"></form-test> -->

			<splash-screen id="splash" area="body"></splash-screen>
			<inicial-screen id="inicial" area="body"></inicial-screen>
			<obra-screen id="obra" area="body"></obra-screen>
			<trabajador-screen id="trabajador" area="body"></trabajador-screen>
			<empresa-screen id="empresa" area="body"></empresa-screen>
			<trabajador-firma-screen id="trabajadorFirma" area="body"></trabajador-firma-screen>
			<recibe-screen id="recibe" area="body"></recibe-screen>
			<recibe-firma-screen id="recibeFirma" area="body"></recibe-firma-screen>
		`;
	}

	stateChanged(state, name) {
		if (name == MEDIA_CHANGE || name == SCREEN) {
			this.mediaSize = state.ui.media.size;
			this.orientation = state.ui.media.orientation;
			this.layout = getLayout(state).name;
			if (!window.MSStream && /iPad|iPhone|iPod/.test(navigator.userAgent)) {
				if ("standalone" in window.navigator && window.navigator.standalone) {
					this.style.height = document.documentElement.offsetHeight ? document.documentElement.offsetHeight : window.innerHeight + "px";
				} else {
					if (state.ui.media.orientation == "portrait") {
						this.style.height = window.innerHeight < window.innerWidth ? window.innerWidth : window.innerHeight + "px";
					} else {
						this.style.height = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight + "px";
					}
				}
				this.update();
			}
		}
		if (name == SPINNER) {
			if (this.shadowRoot) {
				let spinner = this.shadowRoot.querySelector(".spinner");
				if (state.ui.spinner.loading == 1) {
					spinner.removeAttribute("hidden");
				}
				if (state.ui.spinner.loading == 0) {
					spinner.setAttribute("hidden", "");
				}
			}
		}
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
			orientation: {
				type: String,
				reflect: true,
			},
		};
	}
}

window.customElements.define("view-manager", viewManager);
