<script lang="ts">
    import Textfield from "@smui/textfield";
    import Select, {Option} from '@smui/select';
    import {Icon as CommonIcon} from '@smui/common';
    import Button from "@smui/button";
    import {Icon, Label} from "@smui/fab";
    import Dialog, {Content, Title} from '@smui/dialog';
    import Actions from "@smui/dialog/src/Actions";
    import type {SnackbarComponentDev} from '@smui/snackbar';
    import Snackbar from '@smui/snackbar';
    import {fapServerBaseURL} from '../../scripts/store';

    // Hilfsvariable für Daten-Dialog
    let open = false;

    let feedbackSnackbar: SnackbarComponentDev;
    let snackbarText = "";

    let successHintVisible = false;
    // $: disabled = focused
    let username = "";
    let password = "";
    let vorname = "";
    let nachname = "";
    let strasse = "";
    let plz = "";
    let ort = "";
    let land = "";
    let telefon = "";
    let email = "";

    let laender = ['Deutschland', 'Frankreich', 'Schweiz', 'Lummerland'];
    let landOption = 'Lummerland';

    async function sendRegistration() {
        snackbarText = "";

        let userDataJson = JSON.stringify({
            loginName: username,
            passwort: {
                passwort: password
            },
            vorname: vorname,
            nachname: nachname,
            strasse: strasse,
            plz: plz,
            ort: ort,
            land: land,
            telefon: telefon,
            email: {
                adresse: email
            }
        });

        await fetch($fapServerBaseURL + '/addUser',
            {
                method: 'POST',
                body: userDataJson,
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .then(data => {
                if (data.ergebnis === true) {
                    console.log("registered new user:", userDataJson);
                    snackbarText = "Registrierung erfolgreich!";
                } else {
                    console.log(data);
                    console.log("Registrierung nicht möglich: ", data.meldung)
                    snackbarText = "Registrierung hat nicht funktioniert: " + data.meldung;
                }
            }).catch((error) => {
                console.error("ETWAS HAT NICHT FUNKTIONIERT", error);
            });
        // nicht von der Warnung irritieren lassen, das open() funzt.
        feedbackSnackbar.open();
    }
</script>

<Button variant="raised" on:click={() => (open = true)}>
    <Label>Registrieren</Label>
</Button>

<Dialog bind:open aria-labelledby="register-title" aria-describedby="simple-content">
    <Title id="register-title">Daten erfassen</Title>
    <Content id="register-content">
        <div class="register">
            <div>
                <div>
                    <Select bind:value={land} label="Land auswählen" required>
                        {#each laender as landOption}
                            <Option value={landOption}>{landOption}</Option>
                        {/each}
                    </Select>
                </div>
                <Textfield bind:value={username} label="Username" required>
                    <!--            <HelperText slot="helper">Helper Text</HelperText>-->
                </Textfield>
                <!--        <pre class="status">Value: {valueA}</pre>-->
            </div>
            <div>
                <Textfield bind:value={password} label="Passwort" required/>
            </div>
            <div>
                <Textfield bind:value={vorname} label="Vorname" required/>
            </div>
            <div>
                <Textfield bind:value={nachname} label="Name" required/>
            </div>
            <div>
                <Textfield bind:value={strasse} label="Straße" required/>
            </div>
            <div>
                <Textfield bind:value={plz} label="PLZ" required/>
            </div>
            <div>
                <Textfield bind:value={ort} label="Ort" required/>
            </div>
            <div>
                <Textfield bind:value={telefon} label="Telefon" required/>
            </div>
            <div>
                <Textfield bind:value={email} required>
                    <svelte:fragment slot="label">
                        <CommonIcon class="material-icons"
                                    style="font-size: 1em; line-height: normal; vertical-align: top;">
                            email
                        </CommonIcon>
                        Email
                    </svelte:fragment>
                </Textfield>
            </div>
        </div>
        <Actions>
            <Button>
                <Label>Abbrechen</Label>
            </Button>
            <Button variant="raised" on:click={sendRegistration}>
                <Label>Absenden</Label>
                <Icon class="material-icons">send</Icon>
            </Button>
        </Actions>
    </Content>
</Dialog>

<Snackbar bind:this={feedbackSnackbar} labelText={snackbarText} timeout={3}>
    <Label/>
</Snackbar>