const router = require('express').Router();
const controller = require('../controller/mapData');

/* GET forecas. */
router.get('/', controller.getMapData);

module.exports = router;
