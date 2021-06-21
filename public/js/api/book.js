/**
 * 파일 설명
 *
 * 서버와 통신할 수 있는 api함수들을 모아놓았습니다.
 * book에 관련된 api함수들이며 필요한 정보들은 매개변수로 받습니다.
 * lib/request.js를 이용해서 공통된 부분을 제거하였습니다.
 */
import request from '../lib/request.js';

// 모든 책 조회 api
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
};

// 검색 api
export const searchBooksAPI = async (condition) => {
  try {
    const result = await request({
      method: 'get',
      params: `/ebook/search/?condition=${condition}`,
    });

    return result;
  } catch (error) {
    return false;
  }
};

// 대여중인 책 가져오는 api
export const getRentedBooksAPI = async (id) => {
  try {
    const result = await request({
      method: 'get',
      params: `/ebook/rent/customer/${id}`,
    });

    return result;
  } catch (error) {
    window.alert(error);
  }
};

// 예약한 책 가져오는 api
export const getReservedBooksAPI = async (id) => {
  try {
    const result = await request({
      method: 'get',
      params: `/ebook/reserve/customer/${id}`,
    });

    return result;
  } catch (error) {
    window.alert(error);
  }
};

// 책 빌리는 api
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
};

// 책 반납하는 api
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
};

// 책 예약하는 api
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
};

// 예약된 책 취소하는 api
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
};

// 책 대여기간 연장하는 api
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
};
