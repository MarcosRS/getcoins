const coinCal = require('./coin_cal')
const coinJson =  require('./coin_list.json')

async function start() {
    console.log('coinJson: ', coinJson);
    const result = await coinCal.getCoinInfo('ethereum')
    console.log('result: ', result);
}







module.exports = start;