var express = require('express');
var router = express.Router();

router.get('/signup', (_request, response) => {
  res.render('unauthenticated/signup', {});
});

router.get('/login', (_request, response) => {
    res.render('unauthenticated/login', {});
  });



module.exports = router;