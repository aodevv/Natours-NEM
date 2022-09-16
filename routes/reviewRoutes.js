const express = require('express');
const reviewController = require('../controllers/reviewContoller');
const authController = require('../controllers/authController');

// MergeParams is set to true so the reviews router can get access to tourId param
const router = express.Router({ mergeParams: true });

// router.param('id', tourController.checkID);

// POST /tour/4564564/reviews will be handeled here

router.use(authController.protect);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  );

module.exports = router;
