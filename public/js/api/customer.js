/**
 * 파일 설명
 *
 * 서버와 통신할 수 있는 api함수들을 모아놓았습니다.
 * customer에 관련된 api함수들이며 필요한 정보들은 매개변수로 받습니다.
 * lib/request.js를 이용해서 공통된 부분을 제거하였습니다.
 */
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