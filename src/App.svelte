<script lang="ts">
    import {Label} from '@smui/fab';
    import Logout from "./components/Logout.svelte";
    import Login from "./components/Login.svelte";
    import FapTestcall from "./components/FapTestcall.svelte";
    import Register from "./components/Register.svelte";
    import DefaultTheme from "./components/DefaultTheme.svelte";
    import TabBar from '@smui/tab-bar';
    import Tab from '@smui/tab';
    import {user} from "../scripts/stores";
    import MapTab from "./components/map/MapTab.svelte";

    let home = "Home";
    let register = "Registrierung";
    let login = "Login";
    let testcall = "FAP-Testcall";
    let logout = "Logout";
    let about = "About";
    let map = "Karte";
    let clicked = 0;
    let active = "Home";
    let tabs = [home, register, login, map, testcall, logout, about];

</script>

<DefaultTheme/>
<main>
    <header>
        <h1>Friends and Places</h1>
        {#if $user}
            <span>Eingeloggter User: {$user}</span>
        {:else}
            <span>Zurzeit ist niemand eingeloggt</span>
        {/if}
    </header>
    <br>
    <br>
    <div>
        <!--   bind-Variable MUSS active heißen - wird sonst nicht gefunden/aktualisiert!     -->
        <TabBar bind:active let:tab tabs={tabs}>
            <Tab {tab}>
                <Label>{tab}</Label>
            </Tab>
        </TabBar>

        <br>

        <!-- je nachdem, welcher Tab oben ausgewählt ist, wird eine andere Unterkomponente angezeigt -->
        {#if active === home}
            <h3>Happy FAPping!</h3>
        {:else if active === register}
            <Register/>
        {:else if active === login}
            <Login/>
        {:else if active === logout}
            <Logout/>
        {:else if active === testcall}
            <FapTestcall/>
        {:else if active === about}
            <h3>Wahnsinns-Projekt!!</h3>
        {:else if active === map}
            <MapTab/>
        {/if}
    </div>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #670be5;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>