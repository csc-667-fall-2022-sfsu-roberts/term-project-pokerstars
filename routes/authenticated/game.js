var express = require('express');
var router = express.Router();

router.get('/:id', (request, response) => {

const { id } = request.params;

  res.render('authenticated/games', { id });
});

module.exports = router;