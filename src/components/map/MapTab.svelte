<script lang="ts">
    import MapLibreMap from "./MapLibreMap.svelte";
    import Button from "@smui/button";
    import {Icon, Label} from "@smui/fab";
    import Dialog, {Content, Title} from "@smui/dialog";
    import Actions from "@smui/dialog/src/Actions";
    import {Marker} from "maplibre-gl";
    import {mapComponent} from '../../../scripts/stores';
    import Textfield from "@smui/textfield";
    import {getKoordinatenFuerAdresse, getOrtForPlz} from "../../service/FapServerQueryService";

    // Hilfsvariable für Daten-Dialog
    let open = false;

    let plz = "";
    let ort = "";
    let strasse = "";

    async function getOrtsnameFromFapServer(plz: string) {
        ort = await getOrtForPlz(plz);
    }

    async function addMarker() {
        let result = await getKoordinatenFuerAdresse(plz, ort, strasse);

        let lngNumber: number = +result.laengengrad;
        let latNumber: number = +result.breitengrad;
        new Marker({color: getRandomColor()})
            .setLngLat([lngNumber, latNumber])
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
    <Label>Neuer Marker</Label>
</Button>

<Dialog bind:open aria-labelledby="marker-title" aria-describedby="marker-content">
    <Title id="marker-title">Daten erfassen</Title>
    <Content id="marker-content">
        <div class="marker-data">
            <div>
                <Textfield bind:value={plz} label="PLZ" on:focusout={() => getOrtsnameFromFapServer(plz)} required/>
            </div>
            <div>
                <Textfield bind:value={ort} label="Ort" required/>
            </div>
            <div>
                <Textfield bind:value={strasse} label="Strasse" required/>
            </div>
        </div>
    </Content>

    <Actions>
        <Button>
            <Label>Abbrechen</Label>
        </Button>
        <Button variant="raised" on:click={() => addMarker()}>
            <Label>Marker setzen</Label>
            <Icon class="material-icons">push_pin</Icon>
        </Button>
    </Actions>
</Dialog>
<br>
<MapLibreMap/>
