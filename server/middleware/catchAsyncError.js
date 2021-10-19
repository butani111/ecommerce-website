module.exports = (catchErrorFun) => (req, res, next) => {
  Promise.resolve(catchErrorFun(req, res, next)).catch(next);
};
