<script lang="ts">
    import {currentSession, fapServerBaseURL, user} from "../../scripts/stores.ts";
    import Button from "@smui/button";
    import {Icon, Label} from "@smui/fab";
    import Snackbar, {SnackbarComponentDev} from "@smui/snackbar";

    let feedbackSnackbar: SnackbarComponentDev;
    let snackbarText = "";

    // User beim FAP-Server abmelden & User und Session aus dem Client entfernen
    async function handleLogout() {
        if ($user === "" || $currentSession === "") {
            console.log("no user or session set! Login first!");
            return;
        }

        await fetch($fapServerBaseURL + '/logout',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    loginName: $user,
                    sitzung: $currentSession
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.ergebnis === true) {
                    console.log("Logged out user " + $user);
                    snackbarText = "Bye bye!"
                    $user = "";
                    $currentSession = "";
                } else {
                    snackbarText = "Fehler beim Logout";
                    console.log(snackbarText);
                }
            }).catch((error) => {
                console.error("ETWAS HAT NICHT FUNKTIONIERT", error);
            });
        // nicht von der Warnung irritieren lassen, das open() funzt.
        // TODO: warum öffnet sich die Snackbar nicht?
        //  Es ist doch alles genau so wie in den anderen Komponenten? :-C
        feedbackSnackbar.open();
    }
</script>


<div class="logout">
    <Button variant="raised" on:click={handleLogout}>
        <Label>Logout</Label>
        <Icon class="material-icons">logout</Icon>
    </Button>
</div>

<Snackbar bind:this={feedbackSnackbar} labelText={snackbarText} timeout={3}>
    <Label/>
</Snackbar>