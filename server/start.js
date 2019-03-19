const axios = require('axios');
const moment = require('moment');

const start = {
    init(){ 
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
                                highLow1M: this.cal1MHighLow(dailyPrices)
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            return {}
                        });
        return result;
    },
    
    cal1MHighLow(dailyPrices, currentPrice) {
        const aMonthAgo = moment().subtract(30, 'days').format('x')
        const reverseDailyPrices = dailyPrices.reverse();
        let timeStamp = 0; let price = 0; 
        let high = 0; let low = reverseDailyPrices[0][1];
        
        for (let i = 0; i < reverseDailyPrices.length ; i++ ){
            timeStamp = reverseDailyPrices[i][0];
            price = reverseDailyPrices[i][1];
            if (!(timeStamp < aMonthAgo)){
                if (price >= high ) high = price;
                if (price < low) low = price;
            }else{
                break
            }
        }        
        
        console.log('{ high, low }: ', { high, low });
        return { high, low }
    }
    
}





module.exports = start;