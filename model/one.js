const superagent = require("superagent"); //发送网络请求获取DOM
const cheerio = require("cheerio"); //能够像Jquery一样方便获取DOM节点
const { ONE_URL } = require("../config");

// 获取ONE内容
function getOne() {
  return new Promise(function (resolve, reject) {
    superagent.get(ONE_URL).end(function (err, res) {
      if (err) {
        reject(err);
      }
      const $ = cheerio.load(res.text);
      const carousels = $("#carousel-one .carousel-inner .item");
      const [todayOne] = carousels;
      const todayOneData = {
        imgUrl: $(todayOne).find(".fp-one-imagen").attr("src"),
        type: $(todayOne)
          .find(".fp-one-imagen-footer")
          .text()
          .replace(/(^\s*)|(\s*$)/g, ""),
        text: $(todayOne)
          .find(".fp-one-cita")
          .text()
          .replace(/(^\s*)|(\s*$)/g, ""),
      };
      resolve(todayOneData);
    });
  });
}

module.exports = {
  getOne,
};
