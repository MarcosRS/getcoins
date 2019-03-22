const coinCal = require('./coin_cal')
const coinJson =  require('./coin_list.json')
const delay = require('../utils').delay;

async function start() {
        let count = 0
        let below40MPercent = []
        for (let coinName in coinJson) {
            coinCal.getCoinInfo(coinName).then(result => {
                Object.assign(coinJson[coinName], result)
            })
            await delay()
            console.log('count: ', count++, coinName);
        }
        
        console.log('coinJson: ', coinJson);
        console.log('Object.keys(coinJson).length: ', Object.keys(coinJson).length);
        Object.values(coinJson).map(coin =>{
            if (coin.currentPercent < 40){
                below40MPercent.push(coin);
            }
        })
        console.log(below40MPercent.sort((a, b) => (a.currentPercent > b.currentPercent)))

        // console.log('coinJson: ', JSON.stringify(coinJson));
}







module.exports = start;