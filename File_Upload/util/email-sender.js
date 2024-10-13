const nodemailer = require("nodemailer");
const emailHTML = require("./email-template");

module.exports = sendEmail = async (
  from,
  to,
  subject,
  text,
  htmlAdditional
) => {
  var transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: "0b59ed7f46a46dd2281c84fd851e2c43",
    },
  });

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html: emailHTML(htmlAdditional),
  });

  console.log("Mail sent to " + to);
};
