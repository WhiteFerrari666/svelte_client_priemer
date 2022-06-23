<script lang="ts">
    import Textfield from "@smui/textfield";
    import Select, {Option} from '@smui/select';
    import {Icon as CommonIcon} from '@smui/common';

    let focused = false;
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

</script>

<div class="columns margins">
    <div>
        <Textfield bind:value={username} label="Username">
            <!--            <HelperText slot="helper">Helper Text</HelperText>-->
        </Textfield>
        <!--        <pre class="status">Value: {valueA}</pre>-->
    </div>
    <div>
        <Textfield bind:value={password} label="Passwort"/>
    </div>
    <div>
        <Textfield bind:value={vorname} label="Vorname"/>
    </div>
    <div>
        <Textfield bind:value={nachname} label="Name"/>
    </div>
    <div>
        <Textfield bind:value={strasse} label="Straße"/>
    </div>
    <div>
        <Textfield bind:value={plz} label="PLZ"/>
    </div>
    <div>
        <Textfield bind:value={ort} label="Ort"/>
    </div>
    <div>
        <Select bind:value={land} label="Land auswählen">
            {#each laender as landOption}
                <Option value={landOption}>{landOption}</Option>
            {/each}
        </Select>
    </div>
    <div>
        <Textfield bind:value={telefon} label="Telefon"/>
    </div>
    <div>
        <Textfield bind:value={email}>
            <svelte:fragment slot="label">
                <CommonIcon class="material-icons" style="font-size: 1em; line-height: normal; vertical-align: top;">
                    email</CommonIcon>
                Email
            </svelte:fragment>
        </Textfield>
    </div>
</div>