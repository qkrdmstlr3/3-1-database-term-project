/**
 * 파일 설명
 *
 * js는 통신을 위한 fetch 모듈을 자체적으로 제공하고 있습니다.
 * 이 파일은 api폴더에 있는 파일들의 함수들의 공통부분을 제거하기 위해서 만든 모듈입니다.
 * method종류와 url에 붙을 params와 body에 실어보낼 데이터를 인자로 받습니다.
 */
const request = async ({ method, params = '', data = {} }) => {
  const config = { method }

  if (method !== 'get') {
    config.body = JSON.stringify(data);
    config.headers = {
      'Content-Type': 'application/json;charset=utf-8'
    };
  }

  const response = await fetch(params, config);
  return response.json();
};

export default request;