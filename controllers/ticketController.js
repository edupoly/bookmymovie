const Ticket = require('../models/ticketModel');

const getAllTicketsById = async (req, res) => {
  try {
    const userId = req.user.id;
    const tickets = await Ticket.find({ userID: userId });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets', error: error.message });
  }
};

module.exports = { getAllTicketsById };
