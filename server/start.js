const axios = require('axios');
const moment = require('moment');

const start = {
    init(){
        console.log('Hello') 
        this.getCoinInfo('bitcoin');
    },
    getCoinInfo(coinSymbol){
        const result =  axios.get(`https://api.messari.io/asset/${coinSymbol}`)
                        .then( (response) => {
                            const data = response.data;
                            const currentPrice = data.market.price;
                            const dailyPrices = data.detail.prices_daily;
                            return {
                                price: currentPrice,
                                highLow: this.cal1MHighLow(dailyPrices, currentPrice)
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            return {}
                        });
        return result;
    },
    cal1MHighLow(dailyPrices, currentPrice) {
        console.log('dailyPrices, currentPrice: ', dailyPrices, currentPrice);
        dailyPrices.map(dataPoint => {
            const dataPointTime = moment(dataPoint[0]).format('LLL');
            console.log(dataPointTime, dataPoint[1]);
        })
    }
    
}





module.exports = start;