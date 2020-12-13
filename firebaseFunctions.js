const { join } = require('path');
const functions = require('firebase-functions');
const { https } = require('firebase-functions');
const { default: next } = require('next');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

const isDev = process.env.NODE_ENV !== 'production';
const nextjsDistDir = join('src', require('./src/next.config.js').distDir);

const nextjsServer = next({
  dev: isDev,
  conf: {
    distDir: nextjsDistDir,
  },
});
const nextjsHandle = nextjsServer.getRequestHandler();

exports.nextjsFunc = https.onRequest((req, res) => {
  return nextjsServer.prepare().then(() => nextjsHandle(req, res));
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    // Getting query parameter from http request
    const to = req.query.to;
    const msg = req.query.msg;

    const mailOptions = {
      from: gmailEmail,
      to: to,
      subject: 'エントリーを受け付けました',
      html: `${msg}`,
    };

    // Getting results
    return transporter.sendMail(mailOptions, (erro, info) => {
      if (erro) {
        return res.send(erro.toString());
      }
      return res.send('Sended');
    });
  });
});
