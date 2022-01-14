export default function toUrlEncoded(bodyObj) {
    let encodedBody = [];
    for (const val in bodyObj) {
        const encodedKey = encodeURIComponent(val);
        const encodedValue = encodeURIComponent(bodyObj[val]);
        encodedBody.push(encodedKey + "=" + encodedValue);
    }
    encodedBody = encodedBody.join("&");
    return encodedBody;
}