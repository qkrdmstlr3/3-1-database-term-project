const statisticService = require('../service/statistic');
const control = require('../utils/controller');

const getStatistic1 = async (req, res) => {
  const { status, result } = await control(statisticService.getStatistic1);

  return res.status(status).json(result);
};

const getStatistic2 = async (req, res) => {
  const { status, result } = await control(statisticService.getStatistic2);

  return res.status(status).json(result);
};

const getStatistic3 = async (req, res) => {
  const { status, result } = await control(statisticService.getStatistic3);

  return res.status(status).json(result);
};

module.exports = {
  getStatistic1,
  getStatistic2,
  getStatistic3,
}
