import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface IApiErrorResponse {}
export interface IApiResponseData {}

export type TypeApiError<T = IApiErrorResponse> = AxiosError<T>;
export type TypeApiResponse<T = IApiResponseData> = AxiosResponse<T>;
export type TypeApiRequestConfig = AxiosRequestConfig;