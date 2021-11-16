import axios, { AxiosInstance } from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { CreateAxiosOptions } from "./types";
import { Result } from './types/index';


export class QAxios {
  private axiosInstance: AxiosInstance;

  constructor(opt: CreateAxiosOptions) {
    this.axiosInstance = axios.create(opt)
    this.setupInterceptors();
  }

  get<T = any>(url: string, config: AxiosRequestConfig): Promise<Result<T>> {
    config.method = 'GET'
    return this.axiosInstance.get(url, config)
  }
  post<T = any>(url: string, config: AxiosRequestConfig): Promise<Result<T>> {
    config.method = 'POST'
    return this.axiosInstance.get(url, config)
  }
  setupInterceptors() {
    
  }
}