import request from '../lib/request.js';

export const signinCustomerAPI = async (username, password) => {
  try {
    const result = await request({
      method: 'post',
      params: `/customer/signin`,
      data: {
        username,
        password
      }
    });
    
    return result;
  } catch (error) {
    return false;
  }
}