/**
 * 파일 설명
 * 클라이언트에서 받은 request에서 필요한 정보를 추출해서 service 함수에게 넘겨줍니다.
 * service함수에서 반환된 값을 적당한 status와 함께 클라이언트로 돌려줍니다.
 */
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
