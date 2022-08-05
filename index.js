const dayjs = require("dayjs");
const { Range, RecurrenceRule, scheduleJob } = require("node-schedule");
const { MAIL_HOUR, MAIL_MINUTE, START_DATE } = require("./config");
const { sendMail } = require("./model/mail");
const { getOne } = require("./model/one");
const { getWeatherTips, getWeatherData } = require("./model/weather");

function getScheduleRule() {
  const RULE = {
    dayOfWeek: [0, new Range(1, 6)],
    hour: MAIL_HOUR,
    minute: MAIL_MINUTE,
  };
  const rule = new RecurrenceRule();

  for (const key in RULE) {
    rule[key] = RULE[key];
  }

  return rule;
}

async function scheduleCallback() {
  const today = dayjs();
  const model = {
    lastDay: today.diff(dayjs(START_DATE), "day"),
    todaystr: dayjs().format("YYYY/MM/DD"),
  };

  Promise.all([getOne(), getWeatherTips(), getWeatherData()]).then(
    ([one, tip, threeDaysData]) => {
      model.todayOneData = one;
      model.weatherTip = tip;
      model.threeDaysData = threeDaysData;
    
      sendMail(model);
    }
  );

  
}

scheduleJob(getScheduleRule(), scheduleCallback);


// scheduleCallback()