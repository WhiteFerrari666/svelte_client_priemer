<!-- Hier kann man sehen, wie man API-Calls mit Svelte macht und wie die Variablenbindings funktionieren -->

<script lang="ts">
    import Button from '@smui/button';
    import {fapServerBaseURL} from '../../scripts/stores';
    import {getKoordinatenFuerAdresse, getOrtForPlz} from "../service/FapServerQueryService";

    let responseOutput = "Noch keine Antwort erhalten!";
    let responseOutputOrt = "";

    let ortResult = "";
    let koordinatenResult = "";

    async function callFapApiForOrt() {
        ortResult = await getOrtForPlz("41238");
    }

    function resetOrt() {
        ortResult = "";
    }

    async function handleTestCall() {

        const res = await fetch($fapServerBaseURL);
        if (res.ok) {
            responseOutput = await res.text();
            console.log(responseOutput);
        } else {
            throw new Error(res.status.toString());
        }
    }

    function resetResult() {
        responseOutput = "Noch keine Antwort erhalten!";
    }

    async function callForCoordinates() {
        let callResult = await getKoordinatenFuerAdresse("48151", "Münster", "Scharnhorststraße 85");
        koordinatenResult = "lat " + callResult.breitengrad + ", long " + callResult.laengengrad;
    }

    function resetKoordinaten() {
        koordinatenResult = "";
    }
</script>
<div>
    <h3 id="testcall">Testcall zum FAP-Server</h3>
    <span>Der FAP-Server wird aktuell unter der Adresse <b>{$fapServerBaseURL}</b> angesprochen.</span>
</div>
<br>
<div>
    <Button color="secondary" on:click={() => handleTestCall()} variant="raised">Test!</Button>
    <Button on:click={() => resetResult()} variant="raised">Reset</Button>
</div>
<label for="testcall">{responseOutput}</label>
<br>
<div>
    <h3 id="ort">Ort from FAP für PLZ 41238</h3>
    <Button color="secondary" on:click={() => callFapApiForOrt()} variant="raised">
        Do it!
    </Button>
    <Button on:click={() => resetOrt()} variant="raised">Reset</Button>
    <label for="ort">{ortResult}</label>
</div>
<br>
<div>
    <h3 id="koordinaten">Koordinaten-Test für mein trautes Heim</h3>
    <Button color="secondary" on:click={() => callForCoordinates()} variant="raised">
        Do it!
    </Button>
    <Button on:click={() => resetKoordinaten()} variant="raised">Reset</Button>
    <label for="koordinaten">{koordinatenResult}</label>
</div>