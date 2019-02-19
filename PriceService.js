const fakeHeader = require('./config').fakeHeader;
const cheerio = require("cheerio");
const fs = require("fs");
const fetch = require("node-fetch");

let number;
let result;

async function getPriceData(stockNumber){
  number = stockNumber;
  const response = await fetch(getParameter().url, getParameter().headers);
  result = await getData(response);
  return result;
}

function getParameter() {
  return {
    headers: fakeHeader,
    url: "https://goodinfo.tw/StockInfo/StockDetail.asp?STOCK_ID=" + number,
    method: "GET"
  };
}

async function getData(response) {
  if (!response.ok) {
    console.log("some error happen: " + response.statusText);
    return;
  }
  body = await response.text();
  const $ = cheerio.load(body); // 載入 body
  const table_tr = $(".std_tbl tr"); // 爬最外層的 Table(class=BoxTable) 中的 tr
  const table_td = table_tr.eq(3).find("td");
  const price = table_td.eq(0).text();
  const changePrice = table_td.eq(1).text();
  const changeRate = table_td.eq(2).text();
  const priceYesterday = table_td.eq(3).text();
  const openPrice = table_td.eq(4).text();
  const highestPrice = table_td.eq(5).text();
  const lowestPrice = table_td.eq(6).text();
  
  result = {
    price,
    changePrice,
    changeRate,
    priceYesterday,
    openPrice,
    highestPrice,
    lowestPrice
  }
  // 寫入 result.json 檔案
  fs.writeFileSync("result.json", JSON.stringify(result));
  return result;
}

module.exports = {
  getPriceData
};
