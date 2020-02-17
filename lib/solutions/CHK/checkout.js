'use strict';

//noinspection JSUnusedLocalSymbols
module.exports = function (skus) {
    let getPrice = function(itemType, itemCount, itemPrice) {
        const specialChars = ['A','B','E','F','H','K','N','M','P','Q','R', 'U','V'];
        if(specialChars.indexOf(itemType) > -1) return 0;

        return itemCount * itemPrice;
    };

    let getDiscoutPrice = function (itemCount, itemPrice, discountItems, price) {

        let discountedPrice = Math.floor(itemCount / discountItems) * price;
        let normalPrice = Math.floor(itemCount % discountItems) * itemPrice;
        return discountedPrice + normalPrice;
    };

    const priceMap = {
        A: {price :50, count:0},
        B: {price :30, count:0},
        C: {price :20, count:0},
        D: {price :15, count:0},
        E: {price :40, count:0},
        F: {price:10, count: 0},
        G: {price:10, count: 0},
        H: {price:10, count: 0},
        I: {price:10, count: 0},
        J: {price:10, count: 0},
        K: {price:10, count: 0},
        L: {price:10, count: 0},
        M: {price:10, count: 0},
        N: {price:10, count: 0},
        O: {price:10, count: 0},
        P: {price:10, count: 0},
        Q: {price:10, count: 0},
        R: {price:10, count: 0},
        S: {price:10, count: 0},
        T: {price:10, count: 0},
        U: {price:10, count: 0},
        V: {price:10, count: 0},
        W: {price:10, count: 0},
        X: {price:10, count: 0},
        Y: {price:10, count: 0},
        Z: {price:10, count: 0}
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

    let normalPrices= 0;

    Object.keys(priceMap).map(function(key) {
        normalPrices += getPrice(key, priceMap[key].count, priceMap[key].price)
    });

    let p10h = Math.floor(priceMap['H'].count / 10);
    priceMap['H'].count -= p10h * 10;
    let p5h = Math.floor(priceMap['H'].count / 5);

    let ph = p10h * 80 + p5h * 45 + Math.floor(priceMap['H'].count % 5) * priceMap['H'].price;

    let p2k = Math.floor(priceMap['K'].count / 2);

    let pk = p2k * 150 + Math.floor(priceMap['H'].count % 2) * 80;


    /*Calculate free M */
    let freeM = Math.floor(priceMap['N'].count / 3);
    priceMap['M'].count -= freeM;

    let pm = (priceMap['M'].count < 0 ) ? 0 : priceMap['M'].count * priceMap['M'].price;
    let pn = priceMap['N'].count * priceMap['N'].price;


    let pp = getDiscoutPrice(priceMap['P'].count, priceMap['P'].price, 5, 200);
    let pq = getDiscoutPrice(priceMap['Q'].count, priceMap['Q'].price, 3, 80);

    let freeQ = Math.floor(priceMap['R'].count / 3);
    let pr = priceMap['R'].count * priceMap[R].count;

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

    return pn + pm + ph + pk + pf +pe + pa + pb + normalPrices;
};

