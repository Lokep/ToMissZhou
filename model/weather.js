const superagent = require("superagent"); //发送网络请求获取DOM
const cheerio = require("cheerio"); //能够像Jquery一样方便获取DOM节点
const { WEATHER } = require("../config");

// 获取天气提醒
function getWeatherTips() {
  return new Promise(function (resolve, reject) {
    superagent.get(WEATHER).end(function (err, res) {
      if (err) {
        reject(err);
      }
      const $ = cheerio.load(res.text);
      let weatherTip = "";
      $(".wea_tips").each(function (i, elem) {
        weatherTip = $(elem).find("em").text();
      });
      resolve(weatherTip);
    });
  });
}

// 获取天气预报
function getWeatherData() {
  return new Promise(function (resolve, reject) {
    superagent.get(WEATHER).end(function (err, res) {
      if (err) {
        reject(err);
      }
      const $ = cheerio.load(res.text);
      let threeDaysData = [];

      $(".forecast .days").each(function (i, elem) {
        const SingleDay = $(elem).find("li");
        threeDaysData.push({
          Day: $(SingleDay[0])
            .text()
            .replace(/(^\s*)|(\s*$)/g, ""),
          WeatherImgUrl: $(SingleDay[1]).find("img").attr("src"),
          WeatherText: $(SingleDay[1])
            .text()
            .replace(/(^\s*)|(\s*$)/g, ""),
          Temperature: $(SingleDay[2])
            .text()
            .replace(/(^\s*)|(\s*$)/g, ""),
          WindDirection: $(SingleDay[3])
            .find("em")
            .text()
            .replace(/(^\s*)|(\s*$)/g, ""),
          WindLevel: $(SingleDay[3])
            .find("b")
            .text()
            .replace(/(^\s*)|(\s*$)/g, ""),
          Pollution: $(SingleDay[4])
            .text()
            .replace(/(^\s*)|(\s*$)/g, ""),
          PollutionLevel: $(SingleDay[4]).find("strong").attr("class"),
        });
      });
      resolve(threeDaysData);
    });
  });
}

module.exports = {
  getWeatherTips,
  getWeatherData
}