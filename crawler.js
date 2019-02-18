const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const priceService = require("./PriceService");

(function startToCraw() {
  request(
    priceService.getRequestParameter(),
    function(error, response, body) {
      if (error || !body) {
        console.log("some error happen: " + error);
        return;
      }
      const $ = cheerio.load(body); // 載入 body
      const result = []; // 建立一個儲存結果的容器
      const table_tr = $(".std_tbl tr"); // 爬最外層的 Table(class=BoxTable) 中的 tr
      // 建立物件並(push)存入結果
      const table_td = table_tr.eq(3).find("td");
      const price = table_td.eq(0).text();
      const changePrice = table_td.eq(1).text();
      const changeRate = table_td.eq(2).text();
      const priceYesterday = table_td.eq(3).text();
      const openPrice = table_td.eq(4).text();
      const highestPrice = table_td.eq(5).text();
      const lowestPrice = table_td.eq(6).text();
      result.push(
        Object.assign({
          price,
          changePrice,
          changeRate,
          priceYesterday,
          openPrice,
          highestPrice,
          lowestPrice
        })
      );
      console.log(result);
      // 寫入 result.json 檔案
      fs.writeFileSync("result.json", JSON.stringify(result));
    }
  );
})();

