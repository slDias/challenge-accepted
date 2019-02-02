const service = require("../service/locate.js");

this.locate = function(req, res, next) {
  let searchText = req.query.searchText || "";
  try {
    res.send(service.locate(searchText));
  } catch(err) {
    next(err);
  }
}

module.exports = this;
