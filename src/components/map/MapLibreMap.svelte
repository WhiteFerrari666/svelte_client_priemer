<script lang="ts">
    import {onDestroy, onMount} from 'svelte'
    import {Map, NavigationControl} from 'maplibre-gl';
    import 'maplibre-gl/dist/maplibre-gl.css';
    import {mapApiKey} from "../../../scripts/secretStore";
    import {mapComponent} from "../../../scripts/stores";

    let map;
    let mapContainer;

    // Sobald Komponente geladen wird, wird dies automatisch ausgeführt
    onMount(() => {
        // API-Key für die Schnittstelle für Karten-Daten
        // const apiKey = process.env.MAP_API_KEY;
        const apiKey = $mapApiKey;

        // Standort beim Aufruf
        const initialState = {lng: 7.6261347, lat: 51.9606649, zoom: 14};

        // Die eigentliche Karte
        $mapComponent = new Map({
            container: mapContainer,
            style: `https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`,
            center: [initialState.lng, initialState.lat],
            zoom: initialState.zoom
        });
        map = $mapComponent;
        // Steuerungswerkzeuge für Zoom, etc.
        map.addControl(new NavigationControl(), 'top-right');

    });

    // wenn die Komponente nicht mehr angezeigt wird, auch die Karten-Daten entfernen
    onDestroy(() => {
        map.remove();
    });
</script>


<div class="map-wrap">
    <a href="https://www.maptiler.com" class="watermark"><img
            src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler logo"/></a>
    <div class="map" id="map" bind:this={mapContainer}></div>
</div>

<style>

    .map-wrap {
        position: relative;
        width: 100%;
        height: calc(100vh - 77px); /* calculate height of the screen minus the heading */
    }

    .map {
        position: absolute;
        width: 100%;
        height: 100%;
        max-height: 700px;
    }

    .watermark {
        position: absolute;
        left: 10px;
        bottom: 10px;
        z-index: 999;
    }
</style>