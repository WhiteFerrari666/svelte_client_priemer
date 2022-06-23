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
</script>

<h3 id="testcall">Testcall zum FAP-Server</h3>
<button on:click={() => handleTestCall()}>Test!</button>
<label for="testcall">{responseOutput}</label>