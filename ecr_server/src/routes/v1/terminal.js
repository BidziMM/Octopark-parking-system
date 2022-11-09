const express = require('express');

const router = express.Router();
const controller = require('../../controller/terminal.controller')

/**
 * @api {post} v1/terminal Terminal
 * @apiDescription Payment for parking using terminal
 * @apiVersion 1.0.0
 *
 * @apiParam  {Number}          parkingPrice     Payment for parking
 */

router.route('/pay').post(controller.payment);

module.exports = router;