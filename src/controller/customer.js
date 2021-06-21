/**
 * 파일 설명
 * 클라이언트에서 받은 request에서 필요한 정보를 추출해서 service 함수에게 넘겨줍니다.
 * req.body는 post요청을 보낼 때 클라이언트에서 body에 담아 보낸 정보를 가져옵니다.
 * service함수에서 반환된 값을 적당한 status와 함께 클라이언트로 돌려줍니다.
 */
const customerService = require('../service/customer');
const control = require('../utils/controller');

const signinCustomer = async (req, res) => {
  const { status, result } = await control(customerService.signinCustomer, req.body);

  return res.status(status).json(result);
};

module.exports = {
  signinCustomer,
};
