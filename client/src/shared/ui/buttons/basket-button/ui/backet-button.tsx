import { Button } from 'antd';
import { useLoginStore } from 'features/login-forms';
import { useTranslation } from 'react-i18next';

export const BasketButton = () => {
  const { t } = useTranslation('product');
  const { role } = useLoginStore();

  const handleAddToCart = () => {
    console.log('Item added to cart');
  };

  if (role !== 'Customer') {
    return null;
  }

  return (
    <Button type="primary" onClick={handleAddToCart}>
      {t('В корзину')}
    </Button>
  );
};
