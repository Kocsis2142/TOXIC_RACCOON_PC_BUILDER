require('dotenv').config()
const mongoose = require("mongoose")
const app = require('./server')
const port = 4000;

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongoose Is Connected");
  }
);

const connection = mongoose.connection;
  connection.on('error', console.error.bind(console, 'connection error:'))
  connection.once('open', function () {      
  });

app.listen(port, () => {
  console.log("Server Has Started");
});
