/**
 * 파일 설명
 * 통계들과 관련된 api들을 받습니다.
 * 첫 번째 인자로 받은 url을, 두 번째 인자로는 controller의 함수를 넘겨줍니다.
 */
const express = require('express');
const statisticController = require('../controller/statistic');

const router = express.Router();

// 첫 번째 통계정보
router.get('/first', statisticController.getStatistic1);

// 두 번째 통계정보
router.get('/second', statisticController.getStatistic2);

// 세 번째 통계정보
router.get('/third', statisticController.getStatistic3);

module.exports = router;
