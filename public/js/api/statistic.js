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
