function decodeByUtf8Arr(arr) {
    return new TextDecoder().decode(new Uint8Array(arr));
}

module.exports = {
    decodeByUtf8Arr,
};
