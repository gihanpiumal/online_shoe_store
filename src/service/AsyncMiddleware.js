// src/backend/services/AsyncMiddleware.js
module.exports = function (handler) {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (ex) {
      res.status(500).json({ message: ex.message });
    }
  };
};
