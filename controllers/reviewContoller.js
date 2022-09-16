const Review = require('../models/reviewModel');
//const AppError = require('../utils/appError');
//const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

// CRUD: Read
exports.getAllReviews = factory.getAll(Review);

// CRUD: Create
exports.setTourUserIds = (req, res, next) => {
  // Allow nested roues
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);

exports.deleteReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);
