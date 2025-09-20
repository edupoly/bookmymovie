const mongoose = require('mongoose');

const ShowSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  theaterId: {
    type: mongoose.Schema.Types.ObjectId,
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
    type: [Number], // e.g. [1, 5, 10]
    default: [],
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Show', ShowSchema);
