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

export const getRentedBooksAPI = async (id) => {
  try {
    const result = await request({
      method: 'get',
      params: `/ebook/rent/customer/${id}`
    })

    return result;
  } catch (error) {
    window.alert(error);
  }
}

export const getReservedBooksAPI = async (id) => {
  try {
    const result = await request({
      method: 'get',
      params: `/ebook/reserve/customer/${id}`
    })

    return result;
  } catch (error) {
    window.alert(error);
  }
}

export const rentBook = async (customerId, bookId) => {
  try {
    const result = await request({
      method: 'post',
      params: `/ebook/rent/${bookId}/customer/${customerId}`,
    });

    return result;
  } catch (error) {
    window.alert(error);
  }
}
