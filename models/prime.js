const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  primeNumbers: {
    type: [Number],
    required: true,
  },
  timeStamp: { type: Date, required: true },
  timeElapsed: { type: String, required: true },
  primeCount: { type: Number, required: true },
});

module.exports = mongoose.model("PrimeData", courseSchema);
