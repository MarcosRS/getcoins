const coinCal = require('./coin_cal')
const coinJson =  require('./coin_list.json')
const delay = require('../utils').delay;

async function start() {
        for (let coinName in coinJson) {
            coinCal.getCoinInfo(coinName).then(result => {
                Object.assign(coinJson[coinName], result)
            })
            await delay()
            
        }
        console.log('coinJson: ', JSON.stringify(coinJson));
}







module.exports = start;