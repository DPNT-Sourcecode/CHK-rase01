'use strict';

//noinspection JSUnusedLocalSymbols
module.exports = function (skus) {
    let getPrice = function(itemType, itemCount, itemPrice) {
        const specialChars = ['A','B','E','F','H','K','N','M','P','Q','R', 'U','V'];
        if(specialChars.indexOf(itemType) > -1) return 0;

        return itemCount * itemPrice;
    };

    let getDiscoutPrice = function (itemCount, itemPrice, discountItems, price) {
        //console.log({itemCount, itemPrice, discountItems, price});
        if(itemCount <= 0) return 0;
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
        G: {price:20, count: 0},
        H: {price:10, count: 0},
        I: {price:35, count: 0},
        J: {price:60, count: 0},
        K: {price:80, count: 0},
        L: {price:90, count: 0},
        M: {price:15, count: 0},
        N: {price:40, count: 0},
        O: {price:10, count: 0},
        P: {price:50, count: 0},
        Q: {price:30, count: 0},
        R: {price:50, count: 0},
        S: {price:30, count: 0},
        T: {price:20, count: 0},
        U: {price:40, count: 0},
        V: {price:50, count: 0},
        W: {price:20, count: 0},
        X: {price:90, count: 0},
        Y: {price:10, count: 0},
        Z: {price:50, count: 0}
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
    // console.log({p10h, p5h, ph});

    let p2k = Math.floor(priceMap['K'].count / 2);

    let pk = p2k * 150 + Math.floor(priceMap['K'].count % 2) * 80;


    /*Calculate free M */
    let freeM = Math.floor(priceMap['N'].count / 3);
    priceMap['M'].count -= freeM;

    let pm = (priceMap['M'].count < 0 ) ? 0 : priceMap['M'].count * priceMap['M'].price;
    let pn = priceMap['N'].count * priceMap['N'].price;


    let pp = getDiscoutPrice(priceMap['P'].count, priceMap['P'].price, 5, 200);

    /* Ger pq price */
    let freeQ = Math.floor(priceMap['R'].count / 3);

    priceMap['Q'].count -= freeQ;
    if(priceMap['Q'].count < 0) priceMap['Q'].count = 0;
    let pq = getDiscoutPrice(priceMap['Q'].count, priceMap['Q'].price, 3, 80);

    let pr = priceMap['R'].count * priceMap['R'].price;


    let pu = Math.floor(priceMap['U'].count / 4) * 3 * 40 +  Math.floor(priceMap['U'].count % 4) * 40;


    let p3v = Math.floor(priceMap['V'].count / 3);
    priceMap['V'].count -= p3v * 3;
    let p2v = Math.floor(priceMap['V'].count / 2);

    let pv = p3v * 130 + p2v * 90 + Math.floor(priceMap['V'].count % 2) * 50;



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

    // console.log({pv,pr,pq,pp,pn,pm,ph,pk,pf, pe,pa,pb})
    return pv + pu +  pr + pq + pp + pn + pm + ph + pk + pf +pe + pa + pb + normalPrices;
};
