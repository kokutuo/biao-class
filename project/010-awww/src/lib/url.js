/**
 * 拼接地址
 * @param {string} segment 
 * @returns 返回拼接好的地址
 */
export function url(segment) {
  return location.protocol + '//' + location.host + segment;
}