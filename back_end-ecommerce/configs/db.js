const mongoose = require('mongoose');

module.exports = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/e_commerce', {
      autoIndex: true,
      serverSelectionTimeoutMS: 30000 // default 30 seconds
    });
    console.log("MongoDB connected~");
  } catch (err) {
    console.log("Mongoose: ",err);
  }
}
