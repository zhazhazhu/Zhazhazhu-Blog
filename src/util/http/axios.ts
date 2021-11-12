import axios, { AxiosInstance } from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { CreateAxiosOptions } from "/@/util/http/types";


export class QAxios {
  private axiosInstance: AxiosInstance;
  private readonly options: CreateAxiosOptions;

  constructor(opt: CreateAxiosOptions) {
    this.options = opt
    this.axiosInstance = axios.create(opt)
    this.setupInterceptors();
  }

  private getTransform() {
    const { transform } = this.options
    return transform
  }

  get<T = any>(url: string, config: AxiosRequestConfig): Promise<T> {
    config.method = 'GET'
    return this.axiosInstance.get(url, config)
  }
  post<T = any>(url: string, config: AxiosRequestConfig): Promise<T> {
    config.method = 'POST'
    return this.axiosInstance.get(url, config)
  }
  setupInterceptors() { }
}