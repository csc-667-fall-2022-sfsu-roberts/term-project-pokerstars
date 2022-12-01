const protect = (request, response, next) => {
  if (request.session.authenticated) {
    next();
  } else {
    response.redirect("/login");
  }
};

module.exports = protect;
