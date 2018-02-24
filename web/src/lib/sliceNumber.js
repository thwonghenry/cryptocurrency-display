export default (number, length) => {
    if (typeof number === 'undefined' || !number.toString) {
        return number;
    }
    let string = number.toString().slice(0, length);
    if (string[string.length - 1] === '.') {
        string = string.slice(0, -1);
    }
    return string;
};