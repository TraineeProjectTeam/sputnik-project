import { useTranslation } from 'react-i18next';
import { IMessageProps } from '../model/message.types';
import { TextStyled } from './message.styles';

export const Message = (props: IMessageProps) => {
  const { text, locales } = props;
  const { t } = useTranslation(locales);

  return <TextStyled>{t(text)}</TextStyled>;
};
