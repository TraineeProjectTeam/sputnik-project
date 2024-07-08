import { AxiosPromise } from 'axios';
import { IMarker } from '../model/map.types';
import { api } from 'shared/api';

const BASE_URL = '/pickup-points';

export const getPickupPointsRequest = async (): AxiosPromise<IMarker[]> => {
  const response = await api.get(`${BASE_URL}`);
  return response.data;
};
