import {readable, writable} from "svelte/store";
import {Map} from 'maplibre-gl';

// HowTo siehe hier: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_stores

// Bei Bedarf kann hier die URL des lokalen FAP-Servers angepasst werden,
// bspw. wenn er bei euch auf einem anderen Port läuft als hier angegeben.
export const fapServerBaseURL = readable("http://localhost:8088/FAPServer/service/fapservice");


// eingeloggter User, auch in localStorage ablegen wg. PageReload
const storedUser = localStorage.getItem("user");
export const user =
    writable(storedUser, () => {
        return () => console.log("user cleared")
    });

user.subscribe(value => {
    localStorage.setItem("user", value);
    console.log("user set: " + value);
})

// aktuelle SessionID, auch in localStorage ablegen wg. PageReload
const storedSession = localStorage.getItem("session");
export const currentSession =
    writable(storedSession, () => {
        return () => console.log("session cleared");
    });

currentSession.subscribe(value => {
    localStorage.setItem("session", value);
    console.log("new session set: " + value);
})

// Map-Komponente in Store hinterlegen, um sie woanders erreichen zu können
export const mapComponent = writable(Map, () => {
})