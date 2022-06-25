import {readable, writable} from "svelte/store";

// HowTo siehe hier: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_stores

export const user = writable("", (value) => console.log("user " + value.name + ""));


// Bei Bedarf kann hier die URL des lokalen FAP-Servers angepasst werden,
// bspw. wenn er bei euch auf einem anderen Port läuft als hier angegeben.
export const fapServerBaseURL = readable(null, set => {
    set("http://localhost:8088/FAPServer/service/fapservice/")
});
