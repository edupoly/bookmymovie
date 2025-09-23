const Show = require('../models/showModel');
const Theater = require('../models/theaterModel');
const Ticket = require('../models/ticketModel');

// Create Show and update Movie's dates array
exports.createShow = async (req, res) => {
    try {
        const { movieId, theaterId } = req.body;

        // Create show
        const show = new Show(req.body);
        const savedShow = await show.save();

        await Theater.findByIdAndUpdate(
            theaterId,
            { $addToSet: { shows: savedShow._id }, movieId }, // $addToSet prevents duplicates
            { new: true }
        );

        res.status(201).json({
            message: 'Show created and movie date updated',
            data: savedShow,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all shows
exports.getAllShows = async (req, res) => {
    try {
        const shows = await Show.find();
        res.status(200).json({ data: shows });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get shows by movie ID
exports.getShowsByMovie = async (req, res) => {
    try {
        const { movieId } = req.params;
        const shows = await Show.find({ movieId });
        res.status(200).json({ data: shows });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get shows by theater ID
exports.getShowsByTheater = async (req, res) => {
    try {
        const { theaterId } = req.params;
        const shows = await Show.find({ theaterId });
        res.status(200).json({ data: shows });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete show
exports.deleteShow = async (req, res) => {
    try {
        const deleted = await Show.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Show not found' });
        }
        res.status(200).json({ message: 'Show deleted', data: deleted });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Book Ticket
exports.bookTicket = async (req, res) => {
    try {
        console.log("asdfgh");

        const ticketCount = parseInt(req.body.tickets);

        if (isNaN(ticketCount) || ticketCount <= 0) {
            return res.status(400).json({ message: 'Invalid ticket count' });
        }

        const bookingShow = await Show.findById(req.params.id);

        if (!bookingShow) {
            return res.status(404).json({ message: 'Show not found' });
        }

        if (bookingShow.remainingSeats < ticketCount) {
            return res.status(400).json({ message: 'Not enough remaining seats available' });
        }

        
        const from = bookingShow.filledSeats + 1;
        const to = bookingShow.filledSeats + ticketCount;
        const ticket = {
            userID: req.user.id,
            seatsBooked: from + "-" + to,
            bookedAt: new Date(),
            showTime: bookingShow.showTime,
            showDate: bookingShow.showDate
        }
        bookingShow.bookedSeats.push({...ticket});
        bookingShow.remainingSeats -= ticketCount;
        bookingShow.filledSeats = (bookingShow.filledSeats || 0) + ticketCount;
        
        await bookingShow.save();

        const bookedTicket = new Ticket(ticket);
        await bookedTicket.save();
        
        res.status(200).json({
            message: 'Ticket(s) booked successfully',
            data: ticket
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
