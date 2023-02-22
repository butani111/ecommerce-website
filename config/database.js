const mongoose = require("mongoose");

const ConnectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((data) => {
      console.log(`Mongodb connected with server.`);
    })
    // .catch((err) => console.log(err));     // instead used errorHandler in server.js
};

module.exports = ConnectDatabase;
