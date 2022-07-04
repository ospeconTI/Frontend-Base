/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { goTo } from "../../redux/routing/actions";
import { isInLayout } from "@brunomon/template-lit/src/redux/screens/screenLayouts";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";
import logo from "../../../assets/images/logo.png";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const timeOut = setTimeout(() => {
	store.dispatch(goTo("inicial"));
	//store.dispatch(goTo("recibeFirma"));
}, 4000);

export class splashScreen extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
	constructor() {
		super();
		this.hidden = true;
		this.area = "body";
		//this.timeOut = null;
	}

	static get styles() {
		return css`
			:host {
				display: grid;
				position: relative;
				height: 100vh;
				width: 100vw;
				justify-content: center;
				align-items: center;
				background-color: var(--aplicacion);
				padding: 0 !important;
			}
			:host([hidden]) {
				display: none;
			}
			#cuerpo {
				padding: 0.3rem;
				border-radius: 0.5rem;
				box-shadow: var(--shadow-elevation-6-box);
				background-color: var(--on-primario);
			}
			#imagen {
				width: 10rem;
				height: 10rem;
			}
			#version {
				position: absolute;
				top: 1rem;
				left: 1rem;
				color: var(--on-aplicacion);
				font-size: 0.85rem;
				font-weight: 400;
			}
		`;
	}
	render() {
		return html`
			<div id="cuerpo" @click="${this.pasar}">
				<img id="imagen" src=${logo} />
				<div id="version">v.:${__VERSION__}</div>
			</div>
		`;
	}
	stateChanged(state, name) {
		if (name == SCREEN || name == MEDIA_CHANGE) {
			this.mediaSize = state.ui.media.size;
			this.hidden = true;

			const haveBodyArea = isInLayout(state, this.area);
			const SeMuestraEnUnasDeEstasPantallas = "-splash-".indexOf("-" + state.screen.name + "-") != -1;
			if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
				this.hidden = false;
			}
		}
	}

	pasar() {
		clearTimeout(timeOut);
		//store.dispatch(goTo("recibeFirma"));
		store.dispatch(goTo("inicial"));
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
		};
	}
}
window.customElements.define("splash-screen", splashScreen);
