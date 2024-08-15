import { useTranslation } from 'react-i18next';
import { IMessageProps } from '../model/message.types';
import { TextStyled } from './message.styles';

export const Message = (props: IMessageProps) => {
  const { text } = props;
  const { t } = useTranslation();

  return <TextStyled>{t(text)}</TextStyled>;
};
