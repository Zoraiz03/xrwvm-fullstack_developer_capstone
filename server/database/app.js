const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3030;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Load JSON data
const reviews_data = JSON.parse(fs.readFileSync("data/reviews.json", 'utf8'));
const dealerships_data = JSON.parse(fs.readFileSync("data/dealerships.json", 'utf8'));

// MongoDB Connection
mongoose.connect("mongodb://mongo_db:27017/", { 'dbName': 'dealershipsDB' })
  .catch(err => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
  });

const Reviews = require('./review');
const Dealerships = require('./dealership');

// Initialize Database
try {
  Reviews.deleteMany({}).then(() => {
    Reviews.insertMany(reviews_data['reviews']);
  });
  Dealerships.deleteMany({}).then(() => {
    Dealerships.insertMany(dealerships_data['dealerships']);
  });
} catch (error) {
  console.error('Database initialization error:', error);
}


// ---------------------------
// API Routes
// ---------------------------

// Home Route
app.get('/', async (req, res) => {
  res.json({ message: "Welcome to the Mongoose API for Dealerships" });
});

// Fetch all reviews
app.get('/fetchReviews', async (req, res) => {
  try {
    const documents = await Reviews.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Fetch reviews by dealership ID
app.get('/fetchReviews/dealer/:id', async (req, res) => {
  try {
    const documents = await Reviews.find({ dealership: req.params.id });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Fetch all dealerships
app.get('/fetchDealers', async (req, res) => {
  try {
    const documents = await Dealerships.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dealerships' });
  }
});

// Fetch dealerships by state
app.get('/fetchDealers/:state', async (req, res) => {
  try {
    const documents = await Dealerships.find({ state: req.params.state });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dealerships' });
  }
});

// Fetch dealer by ID
app.get('/fetchDealer/:id', async (req, res) => {
  try {
    const document = await Dealerships.findOne({ id: req.params.id });
    if (document) {
      res.json(document);
    } else {
      res.status(404).json({ error: 'Dealership not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dealership' });
  }
});

// Insert a new review
app.post('/insert_review', async (req, res) => {
  try {
    const data = req.body;
    
    // Find the highest ID and increment
    const documents = await Reviews.find().sort({ id: -1 }).limit(1);
    let new_id = documents.length > 0 ? documents[0]['id'] + 1 : 1;

    const review = new Reviews({
      id: new_id,
      name: data['name'],
      dealership: data['dealership'],
      review: data['review'],
      purchase: data['purchase'],
      purchase_date: data['purchase_date'],
      car_make: data['car_make'],
      car_model: data['car_model'],
      car_year: data['car_year'],
    });

    const savedReview = await review.save();
    res.json(savedReview);
  } catch (error) {
    console.error('Error inserting review:', error);
    res.status(500).json({ error: 'Error inserting review' });
  }
});

// Update a review by ID
app.put('/update_review/:id', async (req, res) => {
  try {
    const reviewId = req.params.id;
    const updateData = req.body;

    const updatedReview = await Reviews.findOneAndUpdate(
      { id: reviewId },
      updateData,
      { new: true }
    );

    if (updatedReview) {
      res.json(updatedReview);
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ error: 'Error updating review' });
  }
});

// Delete a review by ID
app.delete('/delete_review/:id', async (req, res) => {
  try {
    const reviewId = req.params.id;

    const deletedReview = await Reviews.findOneAndDelete({ id: reviewId });

    if (deletedReview) {
      res.json({ message: 'Review deleted successfully', review: deletedReview });
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Error deleting review' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
