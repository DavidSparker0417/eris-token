import { isMobile } from 'react-device-detect';

export const log = console.log;

export const numberWithCommas = ((x:any) => {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
});
  
export function truncateDecimals(number, digits) {
    var multiplier = Math.pow(10, digits),
        adjustedNum = number * multiplier,
        truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

    return truncatedNum / multiplier;
};

export function secondToTimeFormatString(seconds) {
    return ("0" + Math.floor(seconds/3600)).slice(-2) + ":" + 
        ("0" + Math.floor((seconds%3600)/60)).slice(-2) + ":" + 
        ("0" + Math.floor(seconds%60)).slice(-2);
}

export function utilGenerateRandomNumber(rangeStart, rangeEnd) {
    return rangeStart + Math.random() * (rangeEnd - rangeStart)
}

export function isMobileScreen() {
    var agent = navigator.userAgent;
    var isWebkit = (agent.indexOf("AppleWebKit") > 0);
    var isIPad = (agent.indexOf("iPad") > 0);
    var isIOS = (agent.indexOf("iPhone") > 0 || agent.indexOf("iPod") > 0);
    var isAndroid = (agent.indexOf("Android") > 0);
    var isNewBlackBerry = (agent.indexOf("AppleWebKit") > 0 && agent.indexOf("BlackBerry") > 0);
    var isWebOS = (agent.indexOf("webOS") > 0);
    var isWindowsMobile = (agent.indexOf("IEMobile") > 0);
    var isSmallScreen = (screen.width < 767 || (isAndroid && screen.width < 1000));
    var isUnknownMobile = (isWebkit && isSmallScreen);
    var isMobile = (isIOS || isAndroid || isNewBlackBerry || isWebOS || isWindowsMobile || isUnknownMobile);
    var isTablet = (isIPad || (isMobile && !isSmallScreen));
  
    return isMobile || isTablet;
  }
  
  export function kutil_isMobileDev() {
    return isMobile();
  }