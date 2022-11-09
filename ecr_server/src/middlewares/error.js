/**
 * Error handler.
 * @public
 */
const handler = (err, req, res, next) => {
    const statusCode = err?.status ? err.status : 500;
    const errorMessage = err?.message ? err.message : "Server error, try later"

  return res.status(statusCode).json({Message:errorMessage})
};

module.exports = handler;
