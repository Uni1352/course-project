const router = require('express').Router();
const db = require('../db/db');

router.route('/todo')
  .get(async (req, res, next) => {
    let result = [];

    await db.readDoc({}, result);
    res.send(result);
  })
  .put((req, res, next) => {
    const filter = {
      title: req.body.filter.title,
      date: req.body.filter.date,
      color: req.body.filter.color
    };
    const updateDoc = {
      $set: {
        title: req.body.title,
        date: req.body.date,
        day: req.body.day
      }
    }

    db.updateDoc(filter, updateDoc, {
      upsert: true
    });
  });

router.route('/todo/:action').post((req, res, next) => {
  switch (req.params.action) {
    case 'insert':
      db.insertDoc(req.body, {
        ordered: true
      });
      break;
    case 'delete':
      db.deleteDoc({
        title: req.body.title,
        date: req.body.date
      });
  }
})

module.exports = router;