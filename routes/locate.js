const router = require('express').Router();
const controller = require('../controller/locate');

/* GET locate. */
router.get('/', controller.locate);

module.exports = router;
