const Theater = require('../models/theaterModel');

exports.createTheater = async (req, res) => {
  try {
    const theater = new Theater(req.body);
    const savedTheater = await theater.save();
    res.status(201).json({ message: 'Theater created', data: savedTheater });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAllTheaters = async (req, res) => {
  try {
    const theaters = await Theater.find();
    res.status(200).json({ theaters });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};