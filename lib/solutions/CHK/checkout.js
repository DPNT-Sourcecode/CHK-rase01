'use strict';

//noinspection JSUnusedLocalSymbols
module.exports = function (skus) {
    const priceMap = {
        A: {price :50, count:0},
        B: {price :30, count:0},
        C: {price :20, count:0},
        D: {price :15, count:0},

    };
    if(!skus) return -1;

    if(skus.length === 1) {
        if(!!priceMap[skus[0]]) {
            return priceMap[skus[0]];
        }
    }

    for(let i = 0; i < skus.length; i++) {
        const item = skus[i];
        if(!!priceMap[item]) {
            priceMap[item].count += 1;
        }
    }

    return priceMap['A'].count * priceMap[A].price +
                priceMap['B'].count * priceMap[B].price +
                priceMap['C'].count * priceMap[C].price +
                priceMap['D'].count * priceMap[D].price;

};

