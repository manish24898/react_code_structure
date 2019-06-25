import { UIConstants } from "../Shared";

const isValidNumber = number => {
    const regex = /^[0]?[789]\d{9}$/;
    return regex.test(number);
}

const isValidOTP = (otp = '') => {
    if (otp.length < UIConstants.otpLength || isNaN(otp)) return false;
    for (let digit of otp) {
        if (!digit && !(digit === 0)) {
            return false;
        }
    }
    return true;
}

const translate3d = (x, y, rotation = 0) => {
    const translate = `translate3d(${x}px, ${y}px, 0px) rotateZ(${rotation}deg)`
    return {
        msTransform: translate,
        WebkitTransform: translate,
        transform: translate
    };
}

const translateCardPosition = (cardIndex = 0) => {
    if (cardIndex > 2) cardIndex = 2;

    let marginTop = `${20 - 10 * cardIndex}px`;
    let marginLeft = `${10 * cardIndex}px`;
    return {
        marginTop,
        marginLeft,
        height: `calc(100% - ${2 * 10 * cardIndex}px - ${marginTop})`,
        width: `calc(100%  - ${2 * 10 * cardIndex}px)`
    };
}

export default {
    isValidNumber,
    isValidOTP,
    translate3d,
    translateCardPosition
};