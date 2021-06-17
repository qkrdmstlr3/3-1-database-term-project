const express = require('express');
const customerController = require('../controller/customer');

const router = express.Router();

// 로그인
router.get('/signin', customerController.signinCustomer);

module.exports = router;
