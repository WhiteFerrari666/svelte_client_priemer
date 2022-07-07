<script lang="ts">
    import MapLibreMap from "./MapLibreMap.svelte";
    import Button from "@smui/button";
    import {Icon, Label} from "@smui/fab";
    import Dialog, {Content, Title} from "@smui/dialog";
    import {Actions} from "@smui/snackbar";
    import {Marker} from "maplibre-gl";
    import {mapComponent} from '../../../scripts/stores';

    // Hilfsvariable für Daten-Dialog
    let open = false;

    function addMarker(lng: number, lat: number) {
        new Marker({color: getRandomColor()})
            .setLngLat([lng, lat])
            .addTo($mapComponent);
    }

    function getRandomColor(): string {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

</script>

<Button variant="raised" on:click={() => (open = true)}>
    <Label>Neuen Marker erfassen</Label>
</Button>
<Dialog bind:open aria-labelledby="marker-title" aria-describedby="simple-content">
    <Title id="marker-title">Daten erfassen</Title>
    <Content id="marker-content">
        <Actions>
            <Button>
                <Label>Abbrechen</Label>
            </Button>
            <Button variant="raised" on:click={() => addMarker(7.6261347, 51.9606649)}>
                <Label>Marker setzen</Label>
                <Icon class="material-icons">push_pin</Icon>
            </Button>
        </Actions>
    </Content>
</Dialog>
<MapLibreMap/>
