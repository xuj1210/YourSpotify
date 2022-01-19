export default function sliceParams(url) {
    let i = 0;
    while (url[i] && url[i] !== '?') {
        ++i;
    }
    return url.slice(i + 1);
}