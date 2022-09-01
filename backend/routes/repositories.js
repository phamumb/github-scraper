const express = require('express');
const router = express.Router();
const repositories = require('../services/repositories');

/* GET quotes listing. */
router.get('/', function(req, res, next) {
  try {
    res.json(repositories.getAllRepositories(req.query.page));
  } catch(err) {
    console.error(`Error while getting repositories `, err.message);
    next(err);
  }
});

router.get('/users', function(req, res, next) {
  try {
    res.json(repositories.getAllUsers())
  } catch(err) {
    console.error(`Error while getting users`)
    next(err);
  }
})

router.get('/:username', function(req, res, next){
  try {
    res.json(repositories.getAllRepositoriesByUsername(req.params.username));
  } catch(err) {
    console.error(`Error while getting repositories by username `)
    next(err);
  }
})


module.exports = router;