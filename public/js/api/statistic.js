/**
 * 파일 설명
 *
 * 서버와 통신할 수 있는 api함수들을 모아놓았습니다.
 * statistic 관련된 api함수들이며 필요한 정보들은 매개변수로 받습니다.
 * lib/request.js를 이용해서 공통된 부분을 제거하였습니다.
 */
import request from '../lib/request.js';

export const getFirstStatistic = async () => {
  try {
    const result = await request({
      method: 'get',
      params: `/statistic/first`,
    });

    return result;
  } catch (error) {
    return false;
  }
}

export const getSecondStatistic = async () => {
  try {
    const result = await request({
      method: 'get',
      params: `/statistic/second`,
    });

    return result;
  } catch (error) {
    return false;
  }
}

export const getThirdStatistic = async () => {
  try {
    const result = await request({
      method: 'get',
      params: `/statistic/third`,
    });

    return result;
  } catch (error) {
    return false;
  }
}
