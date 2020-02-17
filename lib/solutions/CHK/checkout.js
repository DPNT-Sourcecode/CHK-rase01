'use strict';

//noinspection JSUnusedLocalSymbols
module.exports = function (skus) {
    const priceMap = {
        A: {price :50, count:0},
        B: {price :30, count:0},
        C: {price :20, count:0},
        D: {price :15, count:0},
        E: {price :40, count:0},
        F: {price:10, count: 0}

    };

    if(skus == '') return 0;

    if(!skus) return -1;

    if(skus.length === 1) {
        if(!!priceMap[skus[0]]) {
            return priceMap[skus[0]].price;
        }
    }

    for(let i = 0; i < skus.length; i++) {
        const item = skus[i];
        if(!priceMap[item]) return -1;

        if(!!priceMap[item]) {
            priceMap[item].count += 1;
        }
    }

    const pe = priceMap['E'].count * priceMap['E'].price;
    const freeB = Math.floor(priceMap['E'].count / 2);
    priceMap['B'].count = priceMap['B'].count - freeB || 0;

    let p5a = Math.floor(priceMap['A'].count / 5);
    priceMap['A'].count -= p5a *5;

    let p3a = Math.floor(priceMap['A'].count / 3);


    const pa = p3a * 130 + p5a* 200 + (priceMap['A'].count % 3) * priceMap['A'].price;
    let pb = Math.floor(priceMap['B'].count / 2) * 45 + (priceMap['B'].count % 2) * priceMap['B'].price;

    let pf = Math.floor(Math.floor(priceMap['F'].count / 3)) * 2 * 10 + Math.floor(Math.floor(priceMap['F'].count % 3)) * 10;

    if (pb < 0 ) pb = 0;

    return pf +pe + pa + pb + priceMap['C'].count * priceMap['C'].price + priceMap['D'].count * priceMap['D'].price;
};
