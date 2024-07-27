import { ICopyProps } from '../model/copy-button.types';
import { Button, message } from 'antd';
import { StyledCopyOutlined } from './copy-button.styles';
import { useTranslation } from 'react-i18next';

export const CopyButton = (props: ICopyProps) => {
  const { text } = props;
  const { t: tComm } = useTranslation('common');
  const { t: tErr } = useTranslation('error');

  const onClickButtonCopy = () => {
    const trimmedText = text.trim();

    navigator.clipboard
      .writeText(trimmedText)
      .then(() => {
        message.success(tComm(`Текст скопирован!`, { text: trimmedText }));
      })
      .catch((err) => {
        message.error(tErr('Ошибка копирования!', { error: err }));
      });
  };

  return (
    <Button onClick={onClickButtonCopy}>
      <StyledCopyOutlined />
    </Button>
  );
};
