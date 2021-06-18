const request = async ({ method, params = '', data = '' }) => {
  const response = await fetch(params, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });
  return response.json();
};

export default request;