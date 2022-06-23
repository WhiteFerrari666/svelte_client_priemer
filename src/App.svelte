<script lang="ts">
    import MyFirstComponent from "./components/MyFirstComponent.svelte";
    import Button from '@smui/button';
    import Extended from '@smui/button';
    import Fab, {Label, Icon} from '@smui/fab';

    import { Router, Route, Link } from "svelte-navigator";
    import Blog from "./components/Blog.svelte";
    import BackButton from "./components/BackButton.svelte";
    import ForwardButton from "./components/ForwardButton.svelte";
    import Logout from "./components/Logout.svelte";
    import Login from "./components/Login.svelte";
    import FapTestcall from "./components/FapTestcall.svelte";
    import Register from "./components/Register.svelte";
    import DefaultTheme from "./components/DefaultTheme.svelte";

    export let name: string;
    let clicked = 0;
</script>

<DefaultTheme/>
<main>
    <Router>
        <header>
            <h1>Friends and Places</h1>

            <nav>
                <BackButton />
                <ForwardButton />
                <Link to="/">Base</Link>
                <Link to="register">Registrierung</Link>
                <Link to="login">Login</Link>
                <Link to="home">Home</Link>
                <Link to="about">About</Link>
                <Link to="blog">Blog</Link>
                <Link to="logout">Logout</Link>
                <Link to="testcall">FAP-Testcall</Link>
            </nav>
        </header>

        <div>
            <Route path="blog/*blogRoute" component={Blog} />

            <Route path="register" component={Register}/>

            <Route path="login" component={Login}/>

            <Route path="home">
                <h3>Home</h3>
                <p>Home sweet home...</p>
            </Route>

            <Route path="about">
                <h3>About</h3>
                <p>That's what it's all about!</p>
            </Route>

            <Route path="logout" component="{Logout}" primary={false}>
                <h3>Logout</h3>
                <p>Bye bye!</p>
            </Route>

            <Route path="testcall" component="{FapTestcall}"/>

            <Route>
                <h3>Default</h3>
                <p>No Route could be matched.</p>
            </Route>
        </div>
    </Router>

<!-- Hab hier kommt eigentlich aus einem Tutorial, dringelassen für Referenz -->
    <h1>Hello {name}!</h1>
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