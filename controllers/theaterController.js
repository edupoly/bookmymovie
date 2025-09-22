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

exports.updateTheater = async (req, res) => {
  try {
    const updatedTheater = await Theater.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTheater) {
      return res.status(404).json({ message: 'Theater not found' });
    }

    res.status(200).json({ message: 'Theater updated', data: updatedTheater });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteTheater = async (req, res) => {
  try {
    const deletedTheater = await Theater.findByIdAndDelete(req.params.id);
    if (!deletedTheater) {
      return res.status(404).json({ message: 'Theater not found' });
    }
    res.status(200).json({ message: 'Theater deleted', data: deletedTheater });
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

exports.getTheaterById = async (req, res) => {
    try {
        const theater = await Theater.findById(req.params.id);
        if (!theater) {
            return res.status(404).json({ message: 'Theater not found' });
        }
        res.status(200).json({ data: theater });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};