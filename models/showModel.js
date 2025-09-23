const mongoose = require('mongoose');

const ShowSchema = new mongoose.Schema({
  movieId: {
    type: String,
    required: true,
  },
  theaterId: {
    type: String,
    required: true,
  },
  screen: {
    type: Number,
    required: true,
  },
  showDate: {
    type: Date,
    required: true,
  },
  showTime: {
    type: String, // e.g. "19:30"
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  totalSeats: {
    type: Number,
    default: 100,
  },
  bookedSeats: {
    type: [Object],
    default: [],
  },
  remainingSeats:Number,
  filledSeats:Number,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Show', ShowSchema);
