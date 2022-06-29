export async function getOrtForPlz(baseUrl: string, plz: string): Promise<string> {
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
            console.log(ortResults);
            result = ortResults.filter(value => value.countryCode === "DE")[0];
        })
    console.log(result.placeName);
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