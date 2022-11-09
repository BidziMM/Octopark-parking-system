const express = require('express');
const terminal = require('./terminal')
const devTest = require('./devTest')

const router = express.Router();

router.use('/terminal', terminal)
router.use('/test', devTest)

module.exports = router;