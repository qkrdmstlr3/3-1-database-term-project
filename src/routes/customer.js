/**
 * 파일 설명
 * 고객과 관련된 api들을 받습니다.
 * 첫 번째 인자로 받은 url을, 두 번째 인자로는 controller의 함수를 넘겨줍니다.
 */
const express = require('express');
const customerController = require('../controller/customer');

const router = express.Router();

// 로그인
router.post('/signin', customerController.signinCustomer);

module.exports = router;
