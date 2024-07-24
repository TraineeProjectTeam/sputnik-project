import { IConvertDate } from '../model/date.types';

export const convertDeliveryDate = (props: IConvertDate) => {
  const { date, lang } = props;

  return new Date(date).toLocaleTimeString(lang, {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const convertEstimatedDeliveryDate = (props: IConvertDate) => {
  const { date, lang } = props;
  return new Date(date).toLocaleDateString(lang, { day: 'numeric', month: 'long' });
};

export const convertOrderDate = (props: IConvertDate) => {
  const { date, lang } = props;
  return new Date(date).toLocaleDateString(lang, { day: 'numeric', month: 'long' });
};
