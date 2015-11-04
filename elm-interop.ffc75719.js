"use strict";function waitForElement(e,a,r){setTimeout(function(){var l=a.call(null,e,r);l||waitForElement(e,a,r)},50)}function mapManager(e,a){if(!a.leaflet.showMap)return!0;var r=document.querySelector(e);if(!r)return!1;mapEl=mapEl||addMap();var l=JSON.parse(JSON.stringify(a.events)),t=void 0;if(a.leaflet.markers.forEach(function(e){var r=e.id;markersEl[r]?markersEl[r].setLatLng([e.lat,e.lng]):(markersEl[r]=L.marker([e.lat,e.lng]).addTo(mapEl),selectMarker(markersEl[r],r));var n=!!a.leaflet.selectedMarker&&a.leaflet.selectedMarker===r;n&&(t=markersEl[r]),markersEl[r].setIcon(n?selectedIcon:defaultIcon);var m=l.indexOf(r);l.splice(m,1)}),a.leaflet.markers.length){try{mapEl.getBounds()}catch(n){mapEl.fitBounds(a.leaflet.markers)}t?mapEl.panTo(t._latlng):mapEl.fitBounds(a.leaflet.markers)}else mapEl.setZoom(1);l.forEach(function(e){markersEl[e]&&(mapEl.removeLayer(markersEl[e]),markersEl[e]=void 0)});for(var m in markersEl)a.events.indexOf(parseInt(m))>-1||markersEl[m]&&(mapEl.removeLayer(markersEl[m]),markersEl[m]=void 0);return!0}function selectMarker(e,a){e.on("click",function(e){elmApp.ports.selectEvent.send(a)})}function addMap(){var e=L.map("map");return L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ",{maxZoom:10,id:"mapbox.streets"}).addTo(e),e}var elmApp=Elm.fullscreen(Elm.Main,{selectEvent:null}),mapEl=void 0,markersEl={},defaultIcon=L.icon({iconUrl:"default@2x.6d6bb654.png",iconRetinaUrl:"default@2x.6d6bb654.png",iconSize:[35,46]}),selectedIcon=L.icon({iconUrl:"selected@2x.c4402371.png",iconRetinaUrl:"selected@2x.c4402371.png",iconSize:[35,46]});elmApp.ports.mapManager.subscribe(function(e){return!e.leaflet.showMap&&mapEl?(mapEl.remove(),mapEl=void 0,void(markersEl={})):void waitForElement("#map",mapManager,e)});