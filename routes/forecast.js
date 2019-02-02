const router = require('express').Router();
const controller = require('../controller/forecast');

/* GET forecas. */
router.get('/', controller.forecast);

module.exports = router;
