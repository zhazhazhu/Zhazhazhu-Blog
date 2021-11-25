/**
 * @name replaceHtml html内容转string
 * @params html
 * @return string
 */
export function replaceHtml<T = string>(html): T {
  const str = html.replace(/<[^>]+>|&[^>]+;/g, "").trim();//去掉所有的html标签和&nbsp;之类的特殊符合
  return str;
}