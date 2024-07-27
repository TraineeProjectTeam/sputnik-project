import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

export const BasketButton = () => {
  const { t } = useTranslation('product');

  const handleAddToCart = () => {
    console.log('Item added to cart');
  };

  return (
    <Button type="primary" onClick={handleAddToCart}>
      {t('В корзину')}
    </Button>
  );
};
