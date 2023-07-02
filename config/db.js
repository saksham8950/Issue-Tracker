const mongoose = require('mongoose');
require("dotenv").config();

// cloud connection-Str
let cloudDB = process.env.DATABASE;

mongoose.connect(process.env.DB_LOCAL, {
// mongoose.connect(cloudDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
  console.log('DB connected successfully :)');
}).catch(() => {
  console.log('Error connecting DB !!!');
});
