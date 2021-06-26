  /**
 * 파일 설명
 * controller폴더의 모든 파일에서 공통된 부분을 제거하기 위해서 만들어진 모듈
 */
module.exports = async (service, param, status = 200) => {
  try {
    const result = await service(param);

    if (!result.error) {
      return { status, result };
    }
    return { status: 400, result: { error: result.error } };
  } catch (error) {
    console.log(error);
    return { status: 500, result: { error } };
  }
};