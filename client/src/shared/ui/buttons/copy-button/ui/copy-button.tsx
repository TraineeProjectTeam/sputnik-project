import { ICopyProps } from '../model/copy-button.types';
import { Button, message } from 'antd';
import { StyledCopyOutlined } from './copy-button.styles';
import { useTranslation } from 'react-i18next';

export const CopyButton = (props: ICopyProps) => {
  const { text } = props;
  const { t } = useTranslation();

  const onClickButtonCopy = () => {
    const trimmedText = text.trim();

    navigator.clipboard
      .writeText(trimmedText)
      .then(() => {
        message.success(t(`Текст скопирован!`, { text: trimmedText }));
      })
      .catch((err) => {
        message.error(t('Ошибка копирования!', { error: err }));
      });
  };

  return (
    <Button onClick={onClickButtonCopy}>
      <StyledCopyOutlined />
    </Button>
  );
};
