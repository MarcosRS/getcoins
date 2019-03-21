const axios = require('axios');
const moment = require('moment');

const getCoinInfo = async(coinName) => {
        const result = await axios.get(`https://api.messari.io/asset/${coinName}`)
                    .then((response) => {
                        const data = response.data;
                        const currentPrice = data.market.price;
                        const dailyPrices = data.detail.prices_daily;
                        const highLow1M = cal1MHighLow(dailyPrices);
                        const currentPercent = calCurrentPercent(highLow1M.high, highLow1M.low, currentPrice);
                        return {
                            price: currentPrice,
                            highLow1M,
                            currentPercent
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        return {}
                    });
      return result;
  }

  const cal1MHighLow = (dailyPrices) => {
      const aMonthAgo = moment().subtract(30, 'days').format('x')
      const reverseDailyPrices = dailyPrices.reverse();
      let timeStamp = 0;
      let price = 0;
      let high = 0;
      let low = reverseDailyPrices[0][1];

      for (let i = 0; i < reverseDailyPrices.length; i++) {
          timeStamp = reverseDailyPrices[i][0];
          price = reverseDailyPrices[i][1];
          if (!(timeStamp < aMonthAgo)) {
              if (price >= high) high = price;
              if (price < low) low = price;
          } else {
              break
          }
      }

      return { high, low }
  }

  const calCurrentPercent = (high, low, currentPrice) => {
     const range = high - low;
     return ((currentPrice - low) / range) * 100;
  }


module.exports = { getCoinInfo, cal1MHighLow, calCurrentPercent } 
