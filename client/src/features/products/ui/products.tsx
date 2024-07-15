import { ProductCard } from 'shared/ui/product-card/ui/product-card';
import { ContainerStyled, ListStyled } from './products.styles';
import { List } from 'antd';
import { useProductsStore } from 'entities/product';
import { useEffect } from 'react';
import { useCategoriesStore } from 'entities/category';
import { GlobalSpin } from 'shared/ui/global-spin';
import { Message } from 'shared/ui/message';

export const Products = () => {
  const { products, getProducts, loading } = useProductsStore();
  const { selectedCategory } = useCategoriesStore();

  useEffect(() => {
    if (selectedCategory) {
      getProducts(selectedCategory.name);
    }
  }, [selectedCategory]);

  return loading ? (
    <GlobalSpin size={'large'} />
  ) : products.length === 0 ? (
    <Message text="В данной категории пока нет товаров." locales="categories" />
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
