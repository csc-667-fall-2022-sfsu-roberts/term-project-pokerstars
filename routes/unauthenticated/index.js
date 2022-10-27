var express = require('express');
var router = express.Router();

router.get('/', (_request, response) => {
  res.render('unauthenticated/index', {});
});

module.exports = router;
