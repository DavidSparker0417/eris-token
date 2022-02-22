import { isMobile } from 'react-device-detect';

export const log = console.log;

/**********************************************/
/*          Representing numbers               *
/**********************************************/
export const numberWithCommas = ((x:any) => {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
});
  
export function truncateDecimals(number, digits) {
    var multiplier = Math.pow(10, digits),
        adjustedNum = number * multiplier,
        truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

    return truncatedNum / multiplier;
};

/**
 * Remove unnecessary zerios at the end of the number.
 * It is useful when call after toFixed() 
 * @param {*} x : float number including unnecessary zeros
 * @returns : float number convienent to see
 */
export function toHumanizeFixed(x, decimals){
    let d = typeof decimals === 'undefined' ? 10 : decimals;
    if (x > 0.1) d = 5
    return x.toFixed(d).replace(/\.?0*$/,'');
}

export function secondToTimeFormatString(seconds) {
    return (
    "0" + Math.floor(seconds/86400)).slice(-3) + ":" +
    ("0" + Math.floor((seconds%86400)/3600)).slice(-2) + ":" + 
    ("0" + Math.floor((seconds%3600)/60)).slice(-2) + ":" + 
    ("0" + Math.floor(seconds%60)).slice(-2);
}

export function utilGenerateRandomNumber(rangeStart, rangeEnd) {
    return rangeStart + Math.random() * (rangeEnd - rangeStart)
}

export function kutil_isMobileDev() {
    return isMobile();
}