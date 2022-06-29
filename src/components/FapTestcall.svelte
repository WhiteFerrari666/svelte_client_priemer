<!-- Hier kann man sehen, wie man API-Calls mit Svelte macht und wie die Variablenbindings funktionieren -->

<script lang="ts">
    import Button from '@smui/button';
    import {fapServerBaseURL} from '../../scripts/stores';
    import {getOrtForPlz} from "../service/FapServerQueryService";

    let responseOutput = "Noch keine Antwort erhalten!";
    let responseOutputOrt = "";

    let ortResult = "";

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
</script>
<div>
    <h3 id="testcall">Testcall zum FAP-Server</h3>
    <span>Der FAP-Server wird aktuell unter der Adresse <b>{$fapServerBaseURL}</b> angesprochen.</span>
</div>
<br>
<div>
    <Button color="secondary" variant="raised" on:click={() => handleTestCall()}>Test!</Button>
    <Button variant="raised" on:click={() => resetResult()}>Reset</Button>
</div>
<label for="testcall">{responseOutput}</label>
<br>
<div>
    <h3 id="ort">Ort from FAP für PLZ 41238</h3>
    <Button color="secondary" variant="raised" on:click={() => callFapApiForOrt()}>
        Do it!
    </Button>
    <Button variant="raised" on:click={() => resetOrt()}>Reset</Button>
    <label for="ort">{ortResult}</label>
</div>