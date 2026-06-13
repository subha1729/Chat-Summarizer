const sessionAuth = (
  req,
  res,
  next
) => {

  console.log(
    "AUTH CHECK:",
    req.originalUrl,
    req.isAuthenticated
      ? req.isAuthenticated()
      : false
  );

  if (
    req.isAuthenticated &&
    req.isAuthenticated()
  ) {
    return next();
  }

  return res.status(401).json({
    message: "Not authenticated"
  });

};

module.exports = sessionAuth;