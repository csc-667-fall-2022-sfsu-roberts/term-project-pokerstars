var express = require('express');
var router = express.Router();

router.get('/:id', (request, response) => {

const { id } = request.params;

  response.render('authenticated/game.pug', { id });
});

module.exports = router;