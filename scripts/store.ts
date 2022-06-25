import {readable, writable} from "svelte/store";

// HowTo siehe hier: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_stores

// Bei Bedarf kann hier die URL des lokalen FAP-Servers angepasst werden,
// bspw. wenn er bei euch auf einem anderen Port läuft als hier angegeben.
export const fapServerBaseURL = readable("http://localhost:8088/FAPServer/service/fapservice");


// eingeloggter User
export const user =
    writable("", () => {
        return () => console.log("user cleared")
    });

user.subscribe(value => {
    console.log("user set: " + value);
})

// aktuelle SessionID
export const currentSession =
    writable("", () => {
        return () => console.log("session cleared");
    });

currentSession.subscribe(value => {
    console.log("new session set: " + value);
})