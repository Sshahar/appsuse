export const googleBookService = {
    query,
}

function query(txt='') {
    return fetch('apps/book/assets/json/google-volumes.json')
        .then(file => file.json())
        .then(json => json.items)
}