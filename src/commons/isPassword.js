export default function isPassword(v) {
    return /^[a-z\d]*$/i.test(v);
}
