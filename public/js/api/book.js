/**
 * 파일 설명
 *
 * 서버와 통신할 수 있는 api함수들을 모아놓았습니다.
 * book에 관련된 api함수들이며 필요한 정보들은 매개변수로 받습니다.
 * lib/request.js를 이용해서 공통된 부분을 제거하였습니다.
 */
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

export const returnBook = async (customerId, bookId, daterented) => {
  try {
    const result = await request({
      method: 'delete',
      params: `/ebook/rent/${bookId}/customer/${customerId}/date/${daterented}`,
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
