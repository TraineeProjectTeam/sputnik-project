import { Select } from 'antd';
import { EnumStatus } from 'shared/ui/order-card';
import styled from 'styled-components';
import { useOrdersStore } from 'entities/order';
import { useTranslation } from 'react-i18next';

export const FilterOrders = () => {
  const { isLoading, setOrdredStatus, filtredStatus } = useOrdersStore();
  const { t: tOrder } = useTranslation('order');

  const handleChange = (value: EnumStatus) => {
    setOrdredStatus(value);
  };

  return (
    <StyledSelect
      disabled={isLoading}
      onChange={handleChange}
      value={filtredStatus}
      options={Object.values(EnumStatus).map((status) => ({
        value: status,
        label: tOrder(status),
      }))}
    />
  );
};

const StyledSelect = styled(Select)`
  width: 18.75rem;
`;
