import { ProductCard } from 'shared/ui/product-card/ui/product-card';
import { ContainerStyled, ListStyled, TextStyled } from './products.styles';
import { List } from 'antd';
import { useProductsStore } from 'entities/product';
import { useEffect } from 'react';
import { useCategoriesStore } from 'entities/category';
import { GlobalSpin } from 'shared/ui/global-spin';
import { useTranslation } from 'react-i18next';

export const Products = () => {
  const { products, getProducts, loading } = useProductsStore();
  const { selectedCategory } = useCategoriesStore();
  const { t } = useTranslation('categories');

  useEffect(() => {
    if (selectedCategory) {
      getProducts(selectedCategory.name);
    }
  }, [selectedCategory]);
  const NoProductsMessage = () => (
    <TextStyled>{t('В данной категории пока нет товаров.')}</TextStyled>
  );

  return loading ? (
    <GlobalSpin size={'large'} />
  ) : products.length === 0 ? (
    <NoProductsMessage />
  ) : (
    <ContainerStyled>
      <ListStyled>
        {products.map((product) => (
          <List.Item key={product._id}>
            <ProductCard product={product} />
          </List.Item>
        ))}
      </ListStyled>
    </ContainerStyled>
  );
};
