const mongoose = require("mongoose");

const ConnectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((data) => {
      console.log(`Mongodb connected with server.`);
    })
    .catch((err) => console.log(err));
};

module.exports = ConnectDatabase;
