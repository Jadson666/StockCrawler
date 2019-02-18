const fakeHeader = require('./config').fakeHeader;

function getParameter() {
  return {
    headers: fakeHeader,
    url: "https://goodinfo.tw/StockInfo/StockDetail.asp?STOCK_ID=1560",
    method: "GET"
  };
}

module.exports = {
  getRequestParameter: getParameter
};
