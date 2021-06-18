import request from '../lib/request.js';

export const getAllBookAPI = async () => {
  try {
    const result = await request({
      method: 'get',
      params: `/ebook/all`,
    });

    return result;
  } catch (error) {
    return false;
  }
}

export const searchBooksAPI = async (condition) => {
  try {
    const result = await request({
      method: 'get',
      params: `/ebook/search/?condition=${condition}`,
    })

    return result;
  } catch (error) {
    return false;
  }
}