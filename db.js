const mongoose = require('mongoose');
// require('dotenv').config();

// Map global promises
mongoose.Promise = global.Promise;
// Mongoose Connect
// const connectionString = process.env.MONGO_URI ;
const connectionString = `mongodb://localhost:27017/mydb`

mongoose.connect(connectionString, { useCreateIndex: true, useNewUrlParser: true })
  .then(() => console.log("Successfully connected to the database"))
  .catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
  });
mongoose.set('useFindAndModify', false);