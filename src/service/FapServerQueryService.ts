import {fapServerBaseURL} from '../../scripts/stores';
import {get} from "svelte/store";

const baseUrl = get(fapServerBaseURL);

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
            result = ortResults.filter(value => value.countryCode === "DE")[0];
        })
    console.log("Ort für PLZ " + plz + " laut FAP-Server: " + result.placeName);
    return result.placeName;
}

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
    console.log("Username " + username + " bereits vergeben: " + result);
    return result;
}