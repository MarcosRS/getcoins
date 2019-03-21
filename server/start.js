const coinCal = require('./coin_cal')
const coinJson =  require('./coin_list.json')
const delay = require('../utils').delay;

async function start() {
        let count = 0
        for (let coinName in coinJson) {
            coinCal.getCoinInfo(coinName).then(result => {
                Object.assign(coinJson[coinName], result)
            })
            await delay()
            console.log('count: ', count++);
        }
        
        console.log('coinJson: ', coinJson);
        console.log('Object.keys(coinJson).length: ', Object.keys(coinJson).length);
        Object.values(coinJson).map(coin =>{
            if (coin.currentPercent < 30){
                console.log(coin);
            }
        })

        // console.log('coinJson: ', JSON.stringify(coinJson));
}







module.exports = start;