const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  userID: String,
  seatsBooked: String,
  bookedAt: Date,
  showTime: String,
  showDate: String
});

module.exports = mongoose.model('Ticket', ticketSchema);
