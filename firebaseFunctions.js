const { join } = require('path');
const functions = require('firebase-functions');
const { https } = require('firebase-functions');
const { default: next } = require('next');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const admin = require('firebase-admin');
const { firebaseConfig } = require('./firebaseConfig');
admin.initializeApp(firebaseConfig);

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

exports.exportUsers = functions.https.onRequest((request, response) => {
  const json2csv = require('json2csv').parse;
  const db = admin.firestore();
  const ordersRef = db.collection('users');
  return ordersRef
    .get()
    .then((querySnapshot) => {
      const orders = [];
      querySnapshot.forEach((doc) => {
        const order = doc.data();
        orders.push(order);
      });
      const csv = json2csv(orders);
      response.setHeader('Content-disposition', 'attachment; filename=users.csv');
      response.set('Content-Type', 'text/csv');
      response.status(200).send(csv);
      return '';
    })
    .catch((err) => {
      response.status(200).send('エラー発生： ' + err);
      return Promise.resolve();
    });
});
