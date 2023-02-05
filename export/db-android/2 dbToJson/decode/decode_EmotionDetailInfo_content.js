function POSITION_l_productID(buff) {
    return 9 + buff.slice(9).indexOf(0x0a) + 1;
}

function VALUE_l_productID(buff) {
    const p = POSITION_l_productID(buff);
    return buff[p];
}

function LENGTH_$HEAD(buff) {
    const v = VALUE_l_productID(buff);
    return 0 + POSITION_l_productID(buff) + 1 + v;
}

function POSITION_l_productURL(buff) {
    return LENGTH_$HEAD(buff) + 1;
}

function LENGTH_l_productURL(buff) {
    return buff[POSITION_l_productURL(buff)] >= 128 ? 2 : 1;
}

function VALUE_l_productURL(buff) {
    return buff[LENGTH_$HEAD(buff) + 1];
}

function LENGTH_$productURL(buff) {
    return VALUE_l_productURL(buff) + LENGTH_l_productURL(buff) - 1;
}

function POSITION_TITLE(buff) {
    return LENGTH_$HEAD(buff) + LENGTH_$productURL(buff) + 2 + 1 + 1;
}

function VALUE_l_title(buff) {
    const p = POSITION_TITLE(buff) - 1;
    return buff[p];
}

function VALUE_title(buff) {
    const p = POSITION_TITLE(buff);
    return buff.slice(p, p + VALUE_l_title(buff));
}

module.exports = {
    VALUE_title,
};
