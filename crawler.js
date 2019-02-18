const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

function startPoint() {
  request(
    {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36"
      },
      url: "https://goodinfo.tw/StockInfo/StockDetail.asp?STOCK_ID=1560", // 中央氣象局網頁
      method: "GET"
    },
    function(error, response, body) {
      if (error || !body) {
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
}

startPoint();
