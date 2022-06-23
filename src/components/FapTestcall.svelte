<!-- Hier kann man sehen, wie man API-Calls mit Svelte macht und wie die Variablenbindings funktionieren -->

<script>
let responseOutput = "Noch keine Antwort erhalten!";

    async function handleTestCall() {
        const res = await fetch('http://localhost:8088/FAPServer/service/fapservice',
            {
                method: 'GET',
            })

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
<button on:click={() => handleTestCall()}>Test!</button>
<button on:click={() => resetResult()}>Reset</button>
<label for="testcall">{responseOutput}</label>