export function HandleError(response) {
    if (response.ok || (response.status >= 200 && response.status <= 299)) {
        return response.json();
    } else {
        throw Error(response.status + ' ' + response.statusText);
    }
}
