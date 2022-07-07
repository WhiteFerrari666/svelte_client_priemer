// Gebündelte Stelle für Zugriffe auf den FAP-Server

import {fapServerBaseURL} from '../../scripts/stores';
import {get} from "svelte/store";

// Adresse des FAP-Servers
const baseUrl = get(fapServerBaseURL);

// Den zugehörigen Ort einer PLZ über den FAP-Server abfragen
export async function getOrtForPlz(plz: string): Promise<string> {
    let ortResults: OrtResponse[];
    let result: OrtResponse;

    await fetch(baseUrl + '/getOrt?postalcode=' + plz + '&username=isjupr', {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            ortResults = data.postalCodes as OrtResponse[];
            // es kommt immer ein Array aller Ergebnisse zurück.
            // Wir wollen nur Ergebnisse aus Deutschland berücksichtigen.
            // Das Ergebnis sollte eindeutig sein, wir entnehmen aus dem gefilterten Array
            // somit das erste Element und sind glücklich.
            result = ortResults.filter(value => value.countryCode === "DE")[0];
        })
    console.log("Ort für PLZ " + plz + " laut FAP-Server: " + result.placeName);
    return result.placeName;
}

// Interface für die Struktur der Antwort des FAP-Servers definieren,
// um Zugriff auf die Daten zu erleichtern
interface OrtResponse {
    "adminCode2": string,
    "adminCode3": string,
    "adminName3": string,
    "adminCode1": string,
    "adminName2": string,
    "lng": string,
    "countryCode": string,
    "postalCode": string,
    "adminName1": string,
    "ISO3166-2": string,
    "placeName": string,
    "lat": string
}

// Ist der übergebene Username noch frei (d.h. noch nicht vergeben)?
export async function isUsernameVerfuegbar(username: string): Promise<boolean> {
    let result: boolean;

    await fetch(baseUrl + '/checkLoginName?id=' + username, {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            result = data.ergebnis;
        })
    console.log("Username " + username + " verfügbar: " + result);
    return result;
}


export async function getKoordinatenFuerAdresse(plz: string, ort: string, strasse: string) {
    let result: KoordinatenResponse;
    await fetch(baseUrl + '/getStandortPerAdresse?land=Deutschland&plz=' + plz + '&ort='
        + ort + '&strasse=' + strasse)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            result = data as KoordinatenResponse;
        })
    console.log("Koordinaten laut FAP-Server: lat " + result.breitengrad + " lng " + result.laengengrad);
    return result;

}

interface KoordinatenResponse {
    "breitengrad": string,
    "laengengrad": string
}