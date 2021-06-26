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
