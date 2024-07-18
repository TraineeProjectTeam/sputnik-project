import { List } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ICategory, useCategoriesStore } from 'entities/category';
import { CardStyled, ContainerStyled, ListStyled, NameStyled } from './catalog.styles';

export const Catalog = () => {
  const [tCategories] = useTranslation(['categories']);

  const { categories, setSelectedCategory } = useCategoriesStore();

  const navigate = useNavigate();

  const handleCategoryClick = (category: ICategory) => {
    setSelectedCategory(category);
    navigate(`/catalog/${category.id}`);
  };

  return (
    <ContainerStyled>
      <ListStyled>
        {categories(tCategories).map((category) => {
          const createClickHandler = () => {
            handleCategoryClick(category);
          };
          return (
            <List.Item key={category.id} onClick={createClickHandler}>
              <CardStyled hoverable cover={<img alt={category.name} src={category.image} />}>
                <NameStyled level={4}>{category.text}</NameStyled>
              </CardStyled>
            </List.Item>
          );
        })}
      </ListStyled>
    </ContainerStyled>
  );
};
