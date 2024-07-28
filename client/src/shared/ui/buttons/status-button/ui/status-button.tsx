import { InfoCircleFilled } from '@ant-design/icons';
import { IStatusButtonProps } from '../model/status-button.types';
import { useTranslation } from 'react-i18next';
import { StyledButtonStatus } from './status-button.styles';
import { EnumStatus } from '../model/status-button.constants';

export const StatusButton = (props: IStatusButtonProps) => {
  const { status } = props;
  const { t } = useTranslation('order');

  return (
    <StyledButtonStatus size="small" disabled status={status}>
      {t(status)} {status === EnumStatus.delivered && <InfoCircleFilled />}
    </StyledButtonStatus>
  );
};
