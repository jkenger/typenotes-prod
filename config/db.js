const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
    });
  } catch (er) {
    console.log(er);
  }
};

module.exports = connectDB;
