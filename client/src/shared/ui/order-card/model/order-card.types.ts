import { IOrder } from 'entities/order';
import { TFunction } from 'i18next';

export interface IOrderCardProps {
  order: IOrder;
}

export type EnumStatusType = keyof typeof EnumStatus;

export enum EnumStatus {
  active = 'Активный',
  inWay = 'В пути',
  delivered = 'Доставлен',
  recieved = 'Получен',
  cancelled = 'Отменен',
}

export interface IRenderDeliveryDateProps {
  delivery_date: Date | null;
  estimated_delivery_date: Date | null;
  lang: string;
  tOrder: TFunction<'order', undefined>;
  status: string;
}
