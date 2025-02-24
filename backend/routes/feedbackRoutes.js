const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const {
  getFeedback,
  addFeedback,
  updateFeedback,
  deleteFeedback
} = require('../controllers/feedbackController');

// Define routes
router.get('/', getFeedback);
router.post('/', addFeedback);
router.put('/:id', updateFeedback);
router.delete('/:id', deleteFeedback);

module.exports = router;
