<script lang="ts">
    import MyFirstComponent from "./components/MyFirstComponent.svelte";
    import Button from '@smui/button';
    import Extended from '@smui/button';
    import Fab, {Icon, Label} from '@smui/fab';
    import Logout from "./components/Logout.svelte";
    import Login from "./components/Login.svelte";
    import FapTestcall from "./components/FapTestcall.svelte";
    import Register from "./components/Register.svelte";
    import DefaultTheme from "./components/DefaultTheme.svelte";
    import TabBar from '@smui/tab-bar';
    import Tab from '@smui/tab';
    import {user} from "../scripts/stores";

    let home = "Home";
    let register = "Registrierung";
    let login = "Login";
    let testcall = "FAP-Testcall";
    let logout = "Logout";
    let about = "About";
    let clicked = 0;
    let active = "Home";
    let tabs = [home, register, login, testcall, logout, about];

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
        <TabBar tabs={tabs} let:tab bind:active>
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
        {/if}
    </div>

    <!-- ab hier kommt eigentlich aus einem Tutorial, dringelassen für Referenz -->
    <h1>Hello World!</h1>
    <p>hier ein paar Komponenten-Demos</p>
    <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
    <MyFirstComponent/>
    <Button/>
    <Extended/>

    <Fab on:click={() => clicked++} extended>
        <Icon class="material-icons">favorite</Icon>
        <Label>Extended</Label>
    </Fab>
    <Fab color="primary" on:click={() => clicked++} extended>
        <Icon class="material-icons">favorite</Icon>
        <Label>Extended</Label>
    </Fab>
    <div class="margins">
        <Fab on:click={() => clicked++} extended>
            <Label>Extended W/o Icon</Label>
        </Fab>
    </div>
    <div class="margins">
        <Fab color="primary" on:click={() => clicked++} extended>
            <Label>Extended W/o Icon</Label>
        </Fab>
    </div>

    <pre class="status">Clicked: {clicked}</pre>
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