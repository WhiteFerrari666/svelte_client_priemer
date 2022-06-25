<script>
    import {fapServerBaseURL, user} from "../../scripts/store.ts";

    let loginName = "";
    let sitzung = null;

    function getSessionId() {
        let sessionCookie = document.cookie.match("hier Bezeichnung des Session Cookies");
        let sessionId = "";
        if (sessionCookie != null) {
            if (sessionCookie instanceof Array) {
                sessionId = sessionCookie[0].substring(11);
            } else {
                sessionId = sessionCookie.substring(11);
            }
        }
        return sessionId;
    }

    async function handleLogout() {
        if ($user === null) {
            console.log("USER STORE IS NULL")
            return;
        }
        console.log($user);
        loginName = $user["username"];
        sitzung = getSessionId()

        console.log(loginName);

        if (loginName === "") {
            console.log("no user set!");
            return;
        }

        const res = await fetch($fapServerBaseURL + '/logout', {
            method: 'POST',
            body: JSON.stringify({
                loginName,
                sitzung
            })
        })

        const json = await res.json();
        let result = JSON.stringify(json);
        console.log(result);
        console.log("Logged out user" + loginName);
        $user = resetUser();
    }

    function resetUser() {
        return {
            username: "",
            password: ""
        };
    }
</script>


<div class="Logout">
    <button on:click={handleLogout}>
        Logout
    </button>
    <p>bye bye!</p>
</div>