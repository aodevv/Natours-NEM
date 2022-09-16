const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log(err);

  console.log(err.name, err.message);
  console.log('UNHANDELED EXCEPTION, Shutting down...');

  process.exit(1);
});
// eslint-disable-next-line import/newline-after-import
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DB_CONN.replace('<PASSWORD>', process.env.DB_PASS);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful');
  });

const port = 8000;
const server = app.listen(port, () => {
  console.log('App running on port: ', port);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDELED REJECTION, Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
