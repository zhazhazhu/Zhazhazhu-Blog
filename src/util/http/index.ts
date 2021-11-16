import { ContentTypeEnum } from '/@/enums/httpEnum'
import axios, { AxiosResponse } from 'axios'
import { CreateAxiosOptions } from './types'
import { deepMerge } from '../../enums/httpEnum';
import * as qs from 'qs'

const handleResponse = (response: AxiosResponse, createAxiosOptions: CreateAxiosOptions) => {
  const { status, data, config, statusText } = response
  const { requestOptions } = createAxiosOptions
  if (status === 200) {
    if (requestOptions?.isReturnNativeResponse) {
      return response
    }

    if (requestOptions?.isTransformResponse) {
      return data
    }
  } else {
    const errMsg = `${config.url} 后端接口 ${status} 异常：${statusText}`
    return Promise.reject(Error(errMsg))
  }
}

export const createAxios = (opts?: CreateAxiosOptions) => {
  const defaultOpts: CreateAxiosOptions = {
    // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
    // authentication schemes，e.g: Bearer
    // authenticationScheme: 'Bearer',
    timeout: 10 * 1000,
    baseURL: window.projectConfig.hosts.blogs,
    // 基础接口地址
    // 接口可能会有通用的地址部分，可以统一抽取出来
    // urlPrefix: urlPrefix,
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    withCredentials: true,
    // 如果是form-data格式
    // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    // 数据处理方式
    // transform,
    // 配置项，下面的选项都可以在独立的接口请求中覆盖
    requestOptions: {
      // 默认将prefix 添加到url
      joinPrefix: true,
      // 是否返回原生响应头 比如：需要获取响应头时使用该属性
      isReturnNativeResponse: false,
      // 需要对返回数据进行处理
      isTransformResponse: true,
      // post请求的时候添加参数到url
      joinParamsToUrl: false,
      // 格式化提交参数时间
      formatDate: true,
      // 消息提示类型
      errorMessageMode: 'message',
      //  是否加入时间戳
      joinTime: true,
      // 忽略重复请求
      ignoreCancelToken: true,
      // 是否携带token
      withToken: true,
    },
  }
  const config = deepMerge(defaultOpts, opts || {})
  const axiosInstance = axios.create(config)

  axiosInstance.interceptors.request.use(
    (config: CreateAxiosOptions) => {
      axiosInstance._config = config
      if (config.method === 'post' && config.headers) {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        config.data = qs.stringify(config.data)
      }
      // if (config.data && config.headers?.['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8') {
      //   config.data = qs.stringify(config.data);
      // }
      return config
    },

    (error) => {
      return Promise.reject(error)
    }
  )

  axiosInstance.interceptors.response.use(
    (response) => {
      // http code === 200
      const config = axiosInstance._config
      return handleResponse(response, config)
    },
    (error) => {
      const { response } = error
      if (response === undefined) {
        // 没有响应，如 Network Error
        return Promise.reject(error)
      } else {
        //有响应 但是 http code 不等于 200
        return handleResponse(response, axiosInstance._config)
      }
    }
  )

  return axiosInstance
}

export const defHttp = createAxios()
