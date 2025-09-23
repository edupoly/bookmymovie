const mongoose = require('mongoose');

const TheaterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
  },
  zip_code: {
    type: String,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  contact_info: {
    type: String,
  },
  screens: {
    type: Number,
    required: true,
    min: 1
  },
  facilities: {
    type: [String], // e.g., ["3D", "Dolby Atmos", "Wheelchair Accessible"]
    default: [],
  },
  shows: [String],
  logo: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Theater', TheaterSchema);