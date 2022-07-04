//import "ol/ol.css";
import { store } from "../../redux/store";
import { Icon, Circle, Fill, Style, RegularShape, Stroke } from "ol/style";
import { Feature, Map, Overlay, View } from "ol/index";
import { OSM, Vector as VectorSource, XYZ } from "ol/source";
import {} from "ol";
import { Point } from "ol/geom";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { useGeographic } from "ol/proj";
import { html, LitElement, css } from "lit-element";
import { mapaClick } from "../../../src/redux/ui/actions";

export class OLComponent extends LitElement {
	constructor() {
		super();

		this._puntos = [];

		let imagen =
			"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQwcHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0MHB4IiBmaWxsPSIjYTAwMDAwIj48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEyIDhjLTIuMjEgMC00IDEuNzktNCA0czEuNzkgNCA0IDQgNC0xLjc5IDQtNC0xLjc5LTQtNC00em04Ljk0IDNjLS40Ni00LjE3LTMuNzctNy40OC03Ljk0LTcuOTRWMWgtMnYyLjA2QzYuODMgMy41MiAzLjUyIDYuODMgMy4wNiAxMUgxdjJoMi4wNmMuNDYgNC4xNyAzLjc3IDcuNDggNy45NCA3Ljk0VjIzaDJ2LTIuMDZjNC4xNy0uNDYgNy40OC0zLjc3IDcuOTQtNy45NEgyM3YtMmgtMi4wNnpNMTIgMTljLTMuODcgMC03LTMuMTMtNy03czMuMTMtNyA3LTcgNyAzLjEzIDcgNy0zLjEzIDctNyA3eiIvPjwvc3ZnPg==";
		//			"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjgwcHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI4MHB4IiBmaWxsPSIjYTAwMDAwIj48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEyIDJDOC4xMyAyIDUgNS4xMyA1IDljMCA1LjI1IDcgMTMgNyAxM3M3LTcuNzUgNy0xM2MwLTMuODctMy4xMy03LTctN3ptMCA5LjVjLTEuMzggMC0yLjUtMS4xMi0yLjUtMi41czEuMTItMi41IDIuNS0yLjUgMi41IDEuMTIgMi41IDIuNS0xLjEyIDIuNS0yLjUgMi41eiIvPjwvc3ZnPg==";
		//this._puntos.push([-58.4356338, -34.6064996])
		//this._puntos.push([-58.2567308, -34.723714])
		// "data:image/gif;base64,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";

		this.iconStyles = {
			elIcono: new Style({
				image: new Icon({
					anchor: [0.5, 0.5],
					anchorXUnits: "fraction",
					anchorYUnits: "fraction",
					src: imagen,
					scale: [0.1, 0.1],
				}),
			}),
			posicion: new Style({
				image: new Icon({
					anchor: [0.5, 0.5],
					anchorXUnits: "fraction",
					anchorYUnits: "fraction",
					src: imagen,
					scale: [0.1, 0.1],
				}),
			}),
			casco: new Style({
				image: new Icon({
					anchor: [0.5, 0.5],
					anchorXUnits: "fraction",
					anchorYUnits: "fraction",
					src: imagen,
					scale: [0.1, 0.1],
				}),
			}),
			hotel: new Style({
				image: new Icon({
					anchor: [0.5, 0.5],
					anchorXUnits: "fraction",
					anchorYUnits: "fraction",
					src: imagen,
					scale: [0.1, 0.1],
				}),
			}),
			fundacion: new Style({
				image: new Icon({
					anchor: [0.5, 0.5],
					anchorXUnits: "fraction",
					anchorYUnits: "fraction",
					src: imagen,
					scale: [0.1, 0.1],
				}),
			}),
		};
	}

	firstUpdated() {
		useGeographic();

		const link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		//link.setAttribute("href", "css/ol.css");
		this.shadowRoot.appendChild(link);
		const count = this._puntos.length;
		const features = new Array(count);

		for (var i = 0; i < count; ++i) {
			features[i] = new Feature(new Point(this._puntos[i]));
			if (this._puntos[i][4] == "N") {
				features[i].setStyle(this.iconStyles["elIcono"]);
				features[i].getStyle().setZIndex(99);
			} else if (this._puntos[i][4] == "S") {
				features[i].setStyle(this.iconStyles["posicion"]);
				features[i].getStyle().setZIndex(100);
			} else if (this._puntos[i][4] == "H") {
				features[i].setStyle(this.iconStyles["hotel"]);
				features[i].getStyle().setZIndex(100);
			} else if (this._puntos[i][4] == "F") {
				features[i].setStyle(this.iconStyles["fundacion"]);
				features[i].getStyle().setZIndex(100);
			} else {
				features[i].setStyle(this.iconStyles["casco"]);
				features[i].getStyle().setZIndex(100);
			}
		}

		var source = new VectorSource({
			features: features,
		});

		this.vectorLayer = new VectorLayer({
			source: source,
		});

		this.tileLayer = new TileLayer({
			source: new XYZ({
				url: "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
			}),
		});
		this.view = new View({
			center: this._puntos[0],
			zoom: 14,
		});

		this.layers = [this.tileLayer, this.vectorLayer];

		this.map = new Map({
			target: this.shadowRoot.querySelector("#map"),
			layers: this.layers,
			view: this.view,
		});

		if (this.map) {
			this.map.on("singleclick", function (evt) {
				var feature = this.forEachFeatureAtPixel(evt.pixel, function (feature) {
					//return feature;
					//featureListener(feature);
					store.dispatch(mapaClick(feature, evt));
				});
			});

			var currZoom = this.map.getView().getZoom();
			this.map.on("postrender", function (e) {
				var myZoom = this.getView().getZoom();
				if (myZoom != currZoom) {
					var xx = e.map.getLayers();
					var iconos = xx.array_[1].values_.source.uidIndex_;
					var zoomCoef = myZoom < 6 ? 0.08 : (myZoom + 3) / 100;
					for (let key in iconos) {
						//iconos[key].style_.image_.scale_[0] =  zoomCoef
						//iconos[key].style_.image_.scale_[1] =  zoomCoef
						iconos[key].style_.image_.setScale([zoomCoef, zoomCoef]);
					}
					currZoom = myZoom;
				}
			});
		}
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}
			button[title="Attributions"],
			button[title="Reset rotation"],
			ul {
				display: none;
			}
		`;
	}
	render() {
		return html`<div id="map" style="width:100%;height:100%"></div>`;
	}

	set puntos(value) {
		if (value.length > 0) {
			this._puntos = value;
			if (this._puntos[0][0] == 0) this._puntos.shift(0, 1);
			const count = this._puntos.length;
			const features = new Array(this._puntos.length);
			for (var i = 0; i < count; ++i) {
				features[i] = new Feature(new Point(this._puntos[i]));
				if (this._puntos[i][4] == "N") {
					features[i].setStyle(this.iconStyles["elIcono"]);
					features[i].getStyle().setZIndex(99);
				} else if (this._puntos[i][4] == "S") {
					features[i].setStyle(this.iconStyles["posicion"]);
					features[i].getStyle().setZIndex(100);
				} else if (this._puntos[i][4] == "H") {
					features[i].setStyle(this.iconStyles["hotel"]);
					features[i].getStyle().setZIndex(100);
				} else if (this._puntos[i][4] == "F") {
					features[i].setStyle(this.iconStyles["fundacion"]);
					features[i].getStyle().setZIndex(100);
				} else {
					features[i].setStyle(this.iconStyles["casco"]);
					features[i].getStyle().setZIndex(100);
				}
			}

			var source = new VectorSource({
				features: features,
			});

			this.vectorLayer = new VectorLayer({
				source: source,
			});

			this.tileLayer = new TileLayer({
				source: new XYZ({
					url: "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
				}),
			});

			this.layers = [this.tileLayer, this.vectorLayer];

			this.view = new View({
				center: this._puntos.length > 1 ? (this._puntos[0][0] != 0 ? this._puntos[0] : this._puntos[1]) : this._puntos[0],
				zoom: 14,
			});

			if (this.map) {
				this.shadowRoot.querySelector("#map").innerHTML = "";

				this.map = new Map({
					target: this.shadowRoot.querySelector("#map"),
					layers: this.layers,
					view: this.view,
				});

				this.map.on("singleclick", function (evt) {
					var feature = this.forEachFeatureAtPixel(evt.pixel, function (feature) {
						//return feature;
						//featureListener(feature);
						store.dispatch(mapaClick(feature, evt));
					});
				});

				var currZoom = this.map.getView().getZoom();
				this.map.on("postrender", function (e) {
					var myZoom = this.getView().getZoom();
					if (myZoom != currZoom) {
						var xx = e.map.getLayers();
						var iconos = xx.array_[1].values_.source.uidIndex_;
						var zoomCoef = myZoom < 6 ? 0.08 : (myZoom + 3) / 100;
						for (let key in iconos) {
							//iconos[key].style_.image_.scale_[0] =  zoomCoef
							//iconos[key].style_.image_.scale_[1] =  zoomCoef
							iconos[key].style_.image_.setScale([zoomCoef, zoomCoef]);
						}
						currZoom = myZoom;
					}
				});
			}
		}
	}
}

window.customElements.define("ol-map", OLComponent);
