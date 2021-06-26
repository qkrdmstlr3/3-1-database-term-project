import request from '../lib/request.js';

export const signinCustomerAPI = async (email, password) => {
  try {
    const result = await request({
      method: 'post',
      params: `/customer/signin`,
      data: {
        email,
        password
      }
    });
    
    return result;
  } catch (error) {
    return false;
  }
}