const router = require('express').Router();

router.route('/').get((req, res, next) => {
  res.send('home');
});

module.exports = router;