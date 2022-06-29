<script lang="ts">
    import {currentSession, fapServerBaseURL, user} from "../../scripts/stores";
    import Button from "@smui/button";
    import Textfield from "@smui/textfield";
    import {Icon, Label} from "@smui/fab";
    import Snackbar, {SnackbarComponentDev} from "@smui/snackbar";

    let username = "";
    let password = "";

    let feedbackSnackbar: SnackbarComponentDev;
    let snackbarText = "";

    async function handleFapLogin() {
        await fetch($fapServerBaseURL + '/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    loginName: username,
                    passwort: {
                        passwort: password
                    }
                })
            })
            .then(res => res.json())
            .then(data => {
                let sessionID = data.sessionID;
                if (sessionID !== "" && sessionID !== undefined) {
                    console.log('logged in user', username);
                    snackbarText = "Login erfolgreich";
                    $user = username;
                    $currentSession = sessionID;
                } else {
                    snackbarText = "Login fehlgeschlagen";
                    console.log(snackbarText);
                }
            }).catch((error) => {
                console.error("ETWAS HAT NICHT FUNKTIONIERT", error);
                snackbarText = "Login fehlgeschlagen";
            });
        // nicht von der Warnung irritieren lassen, das open() funzt.
        feedbackSnackbar.open();
    }
</script>

<!-- TODO: vernünftig stylen mit CSS statt linebreaks -->
<div class="login">
    <Textfield bind:value={username} label="Username"/>
    <br/>
    <Textfield bind:value={password} label="Passwort"/>
    <br/>
    <br/>
    <Button variant="raised" on:click={handleFapLogin}>
        <Label>Login</Label>
        <Icon class="material-icons">login</Icon>
    </Button>
</div>

<Snackbar bind:this={feedbackSnackbar} labelText={snackbarText} timeout={3}>
    <Label/>
</Snackbar>
