<script lang="ts">
    import MyFirstComponent from "./components/MyFirstComponent.svelte";
    import Button from '@smui/button';
    import Extended from '@smui/button';
    import Fab, {Label, Icon} from '@smui/fab';

    import { Router, Route, Link } from "svelte-navigator";
    import Blog from "./components/Blog.svelte";
    import BackButton from "./components/BackButton.svelte";
    import ForwardButton from "./components/ForwardButton.svelte";

    export let name: string;
    let clicked = 0;
</script>

<Router>
    <header>
        <h1>History</h1>

        <nav>
            <BackButton />
            <ForwardButton />
            <Link to="/">Base</Link>
            <Link to="home">Home</Link>
            <Link to="about">About</Link>
            <Link to="blog">Blog</Link>
        </nav>
    </header>

    <main>
        <Route path="blog/*blogRoute" component={Blog} />

        <Route path="home">
            <h3>Home</h3>
            <p>Home sweet home...</p>
        </Route>

        <Route path="about">
            <h3>About</h3>
            <p>That's what it's all about!</p>
        </Route>

        <Route>
            <h3>Default</h3>
            <p>No Route could be matched.</p>
        </Route>
    </main>
</Router>


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