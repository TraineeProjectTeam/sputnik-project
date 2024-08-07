import { List } from 'antd';
import { useProductsStore } from 'entities/product';
import { useTranslation } from 'react-i18next';
import { GlobalSpin } from 'shared/ui/global-spin';
import { ProductCard } from 'shared/ui/product-card';
import { StyledList } from './products-vendor.styles';

export const ProductsVendorPage = () => {
  const { productsForVendor, isLoadingForVendor } = useProductsStore();
  const { t } = useTranslation('product');

  if (isLoadingForVendor) {
    return <GlobalSpin size={'large'} />;
  }

  return (
    <>
      <h1>{t('Список ваших продуктов')}</h1>
      {!productsForVendor.length ? (
        <h1>{t('У вас пока нет продуктов')}</h1>
      ) : (
        <StyledList>
          {productsForVendor.map((product) => (
            <List.Item key={product._id}>
              <ProductCard product={product} />
            </List.Item>
          ))}
        </StyledList>
      )}
    </>
  );
};
