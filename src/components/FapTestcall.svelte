<!-- Hier kann man sehen, wie man API-Calls mit Svelte macht und wie die Variablenbindings funktionieren -->

<script lang="ts">
    import Button from '@smui/button';


    let responseOutput = "Noch keine Antwort erhalten!";

    async function handleTestCall() {
        const res = await fetch('http://localhost:8088/FAPServer/service/fapservice');
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

<h3 id="testcall">Testcall zum FAP-Server</h3>
<Button color="secondary" variant="raised" on:click={() => handleTestCall()}>Test!</Button>
<Button variant="raised" on:click={() => resetResult()}>Reset</Button>
<label for="testcall">{responseOutput}</label>