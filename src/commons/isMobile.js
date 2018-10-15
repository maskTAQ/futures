export default function isMobile(mobile) {
    return /^[1][3,4,5,7,8][0-9]{9}$/.test(mobile);
}
