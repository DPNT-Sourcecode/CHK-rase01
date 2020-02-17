'use strict';

//noinspection JSUnusedLocalSymbols
module.exports = function (skus) {

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
        K: {price:70, count: 0},
        L: {price:90, count: 0},
        M: {price:15, count: 0},
        N: {price:40, count: 0},
        O: {price:10, count: 0},
        P: {price:50, count: 0},
        Q: {price:30, count: 0},
        R: {price:50, count: 0},
        S: {price:20, count: 0},
        T: {price:20, count: 0},
        U: {price:40, count: 0},
        V: {price:50, count: 0},
        W: {price:20, count: 0},
        X: {price:17, count: 0},
        Y: {price:20, count: 0},
        Z: {price:21, count: 0}
    };

    let getPrice = function(itemCount, itemPrice) {
        return itemCount * itemPrice;
    };

    let getDiscoutPrice = function (itemCount, itemPrice, discountItems, price) {
        if(itemCount <= 0) return 0;
        let discountedPrice = Math.floor(itemCount / discountItems) * price;
        let normalPrice = Math.floor(itemCount % discountItems) * itemPrice;
        return discountedPrice + normalPrice;
    };


    let calculateFreeItems = function(buyItem, freeItemType, mustHave) {
        const freeItemCount = Math.floor(priceMap[buyItem].count / mustHave);
        priceMap[freeItemType].count -= freeItemCount;
        if(priceMap[freeItemType].count < 0) {
            priceMap[freeItemType].count = 0;
        }

        return getPrice(priceMap[buyItem].count, priceMap[buyItem].price);
    }

    let calculateBulkItems = function(itemList, batchCount, bulkPrice) {
        const reducer = (accumulator, item) => accumulator + priceMap[item].count;
        let itemCount = itemList.reduce(reducer, 0);

        let bulkItemPrice = Math.floor(itemCount / batchCount) * bulkPrice;

        let remainingItems = Math.floor(itemCount % batchCount);

        let normalPrice = 0;

        for(let i = 0; i < itemList.length; i++) {
            if(remainingItems <= 0 ) {
                break;
            }

            if(priceMap[itemList[i]].count != 0) {
                normalPrice += remainingItems * priceMap[itemList[i]].price;

                remainingItems -= priceMap[itemList[i]].count;
            }
        }

        return bulkItemPrice + normalPrice;
    }

    let calculateSelfDiscount = function (itemType, itemCount) {
        const price = priceMap[itemType].price;

        let nbulk = Math.floor(priceMap[itemType].count / (itemCount + 1));
        let remaining = Math.floor(priceMap[itemType].count % (itemCount + 1));

        return (remaining + nbulk * itemCount) * price;
    }


    /*Array {count: number, price: number} */
    let calculateDiscount = function(itemType, discountList) {
        let totalPrice = 0;

        for(let i = 0; i < discountList.length; i++) {
            let bulkCount = discountList[i].count;
            let price = discountList[i].price;
            let nc = Math.floor(priceMap[itemType].count / bulkCount);

            totalPrice += nc * price;

            priceMap[itemType].count -= nc * bulkCount;

            if(priceMap[itemType].count < 0) {
                priceMap[itemType].count = 0;
            }
        }

        return totalPrice;
    }




    if(skus == '') return 0;

    if(!skus) return -1;


    for(let i = 0; i < skus.length; i++) {
        const item = skus[i];
        if(!priceMap[item]) return -1;

        if(!!priceMap[item]) {
            priceMap[item].count += 1;
        }
    }

    let normalPrices= 0;

    Object.keys(priceMap).map(function(key) {
        const specialChars = ['A','B','E','F','H','K','N','M','P','Q','U','R','S','T','X','Y','Z','V'];

        normalPrices += (specialChars.indexOf(key) > -1) ? 0 :getPrice(priceMap[key].count, priceMap[key].price);
    });

	let pe = calculateFreeItems('E', 'B', 2);
    let pn = calculateFreeItems('N', 'M', 3);
	let pr = calculateFreeItems('R', 'Q', 3);


    let pa = calculateDiscount('A', [{count:5, price:200}, {count:3, price:130}, {count:1, price:50}]);
    let pb = calculateDiscount('B', [{count:2, price:45}, {count:1, price:30}]);
	let pf = calculateSelfDiscount('F', 2);

    let ph = calculateDiscount('H', [{count:10, price:80}, {count:5, price:45}, {count:1, price:10}]);

    let pk = calculateDiscount('K', [{count:2, price:120}, {count:1, price:70}]);
    let pp = calculateDiscount('P', [{count:5, price:200}, {count:1, price:50}]);
    let pu = calculateSelfDiscount('U', 3);

	let pv = calculateDiscount('P', [{count:3, price:130}, {count:2, price:90}, {count:1, price:50}]);
    let pm = getPrice(priceMap['M'].count, 15);
    let pq =  calculateDiscount('Q', [{count:3, price:80}, {count:1, price:30}]);

    let bulkItems = calculateBulkItems(['Z','T','S', 'Y','X'], 3, 45);
    return normalPrices + bulkItems + pe + pn + pr + pa + pb + pf + ph + pk + pp + pu + pv + pm + pq;
};




