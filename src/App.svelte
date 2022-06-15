<script lang="ts">
    import MyFirstComponent from "./components/MyFirstComponent.svelte";
    import Button from '@smui/button';
    import Extended from '@smui/button';
    import Fab, {Label, Icon} from '@smui/fab';

    export let name: string;
    let clicked = 0;
</script>


<main>
    <h1>Hello {name}!</h1>
    <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
    <MyFirstComponent/>
    <Button/>
    <Extended/>
</main>

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

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
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