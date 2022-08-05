const schedule = require("node-schedule"); //定时器任务库

let rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 6)];
rule.hour = EmailHour;
rule.minute = EmialMinminute;
console.log("NodeMail: 开始等待目标时刻...");
let j = schedule.scheduleJob(rule, function () {
  console.log("执行任务");
  getAllDataAndSendMail();
});
