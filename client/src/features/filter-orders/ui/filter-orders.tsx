import { Select } from 'antd';
import { useOrdersStore } from 'entities/order';
import { useTranslation } from 'react-i18next';
import { EnumStatus } from 'shared/ui/buttons';
import cls from './filter-orders.module.scss';

export const FilterOrders = () => {
  const { isLoading, setOrdredStatus } = useOrdersStore();
  const { t } = useTranslation('order');

  const handleChange = (value: EnumStatus) => {
    setOrdredStatus(value);
  };

  return (
    <Select
      disabled={isLoading}
      defaultValue={EnumStatus.all}
      onChange={handleChange}
      className={cls.select}
    >
      {Object.values(EnumStatus).map((status) => (
        <Select.Option key={status} value={status}>
          {t(status)}
        </Select.Option>
      ))}
    </Select>
  );
};
