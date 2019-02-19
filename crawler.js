const priceService = require("./PriceService");

(async function startToCraw() {
  const stockNo = 3406;
  const priceObject = await priceService.getPriceData(stockNo);
  let {price, changePrice, changeRate} = priceObject
  console.log(
    `
     股票編號: ${stockNo}
     價錢: ${price}
     漲跌幅: ${changePrice}
     漲跌率: ${changeRate}
    `
  )
})();

