<script>
    import { useNavigate, useLocation } from "svelte-navigator";
    import { user } from "../../scripts/store.ts";

    const navigate = useNavigate();
    const location = useLocation();

    let username;
    let password;

    function handleSubmit() {
        $user = { username, password };
        const from = ($location.state && $location.state.from) || "/";
        navigate(from, { replace: true });
    }

    async function handleFapLogin() {
        const res = await fetch('http://localhost:8088/FAPServer/service/fapservice/login',
        {
            method: 'POST',
            body: JSON.stringify({
                loginName: username,
                passwort: {
                    passwort: password
            }
        }),
            headers: {
                'Content-Type': 'application/json'
            },
        })

        console.log('logged in user', username);

        if (res.ok) {
            return username;
        } else {
            console.log("ETWAS HAT NICHT FUNKTIONIERT!")
            console.log(res)
            // throw new Error(username);
        }
    }
</script>

<h3 id="Login">Login</h3>
<form on:submit={() => handleFapLogin()}>
    <input
            bind:value={username}
            type="text"
            name="username"
            placeholder="Username"
    />
    <br />
    <input
            bind:value={password}
            type="password"
            name="password"
            placeholder="Password"
    />
    <br />
    <button type="submit">Login</button>
</form>
