const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: Number,
  language: [String],
  genre: [String],
  releaseDate: Date,
  rating: Number,
  reviews: String,
  cast: [String],
  crew: [String],
  censorCertificate: String,
  posterUrl: String,
});

module.exports = mongoose.model('Movie', MovieSchema);
