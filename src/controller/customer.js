const customerService = require('../service/customer');

const signinCustomer = (req, res) => {
  const result = customerService.signinCustomer();

  return res.send(200).json(result);
};

module.exports = {
  signinCustomer,
};
