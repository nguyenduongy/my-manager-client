export default function fetchData (url, options) {
    const abortCtrl = new AbortController();

    return new Promise((resolve, reject) => {
        fetch(url, options, { signal: abortCtrl.signal })
        .then(res => res.json())
        .then(data => {
            resolve(data);
        })
        .catch(err => {
            reject(err);
        })
    })
}