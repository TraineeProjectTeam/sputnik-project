import { Select } from 'antd';
import { useOrdersStore } from 'entities/order';
import { useTranslation } from 'react-i18next';
import { EnumStatus } from 'shared/ui/order-card';

export const FilterOrders = () => {
  const { isLoading, setOrdredStatus } = useOrdersStore();
  const { t: tOrder } = useTranslation('order');

  const handleChange = (value: EnumStatus) => {
    setOrdredStatus(value);
  };

  return (
    <Select
      disabled={isLoading}
      defaultValue={EnumStatus.all}
      onChange={handleChange}
      style={{ width: 300 }}
    >
      {Object.values(EnumStatus).map((status) => (
        <Select.Option key={status} value={status}>
          {tOrder(status)}
        </Select.Option>
      ))}
    </Select>
  );
};
