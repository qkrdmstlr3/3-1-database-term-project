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