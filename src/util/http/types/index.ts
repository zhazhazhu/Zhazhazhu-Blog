import type { AxiosResponse } from 'axios';

export interface CreateAxiosOptions extends AxiosResponse {
    transform?: AxiosTransform
}

class AxiosTransform {

}