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

export const returnBook = async (bookId) => {
  try {
    const result = await request({
      method: 'delete',
      params: `/ebook/rent/${bookId}`,
    });

    return result;
  } catch (error) {
    window.alert(error);
  }
}

export const reserveBook = async (customerId, bookId) => {
  try {
    const result = await request({
      method: 'post',
      params: `/ebook/reserve/${bookId}/customer/${customerId}`,
    });

    return result;
  } catch (error) {
    window.alert(error);
  }
}

export const cancelReservedBook = async (customerId, bookId) => {
  try {
    const result = await request({
      method: 'delete',
      params: `/ebook/reserve/${bookId}/customer/${customerId}`,
    });

    return result;
  } catch (error) {
    window.alert(error);
  }
}

export const extendExtBook = async (bookId) => {
  try {
    const result = await request({
      method: 'put',
      params: `/ebook/extend/${bookId}`,
    });

    return result;
  } catch (error) {
    window.alert(error);
  }
}
