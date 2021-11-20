/*
 * 将base64转换成可用formData提交的文件
 * @param {string} urlData base64的url
 * @return {Blob}
 */
export function convertBase64UrlToBlob(urlData) {
  //去掉url的头，并转换为byte 
  var split = urlData.split(',');
  var bytes = window.atob(split[1]);
  //处理异常,将ascii码小于0的转换为大于0  
  var ab = new ArrayBuffer(bytes.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], { type: split[0] });
}