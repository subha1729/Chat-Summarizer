// middleware/auth.js

module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  next();
};

router.get(
  "/summary",
  auth,
  summaryController.getSummary
);