const customerService = require('../service/customer');
const control = require('../utils/controller');

const signinCustomer = async (req, res) => {
  const { status, result } = await control(customerService.signinCustomer, req.body);

  return res.status(status).json(result);
};

module.exports = {
  signinCustomer,
};
