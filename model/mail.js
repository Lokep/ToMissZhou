const nodemailer = require("nodemailer"); //发送邮件的node插件
const fs = require("fs"); //文件读写
const path = require("path"); //路径配置
const ejs = require("ejs"); //ejs模版引擎
const {
  MAIL_SERVICE,
  MAIL_AUTH,
  MAIL_FORM,
  MAIL_TO,
  MAIL_SUBJECT,
} = require("../config");

// 发动邮件
function sendMail(HtmlData) {
  const template = ejs.compile(
    fs.readFileSync(path.resolve(__dirname, "../template/default.ejs"), "utf8")
  );
  const html = template(HtmlData);

  const transporter = nodemailer.createTransport({
    service: MAIL_SERVICE,
    port: 465,
    secureConnection: true,
    auth: MAIL_AUTH,
  });

  const mailOptions = {
    from: MAIL_FORM,
    to: MAIL_TO,
    subject: MAIL_SUBJECT,
    html,
  };
  transporter.sendMail(mailOptions, (error, info = {}) => {
    if (error) {
      console.log(error);
      sendMail(HtmlData); //再次发送
    }
    console.log("邮件发送成功", info.messageId);
    console.log("静等下一次发送");
  });
}

module.exports = {
  sendMail,
};
