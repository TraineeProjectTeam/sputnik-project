import { categoriesData, useCategoriesStore } from 'entities/category';
import { Products } from 'features/products';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { LinkStyled, TitleStyled } from './category.styles';
import { useEffect, useMemo } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';

export const CategoryPage = () => {
  const { t } = useTranslation('categories');
  const { selectedCategory, setSelectedCategory } = useCategoriesStore();
  const { id } = useParams();
  const navigate = useNavigate();

  const category = useMemo(() => {
    return categoriesData(t).find((category) => category.id === id);
  }, [id]);

  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    } else {
      navigate('/catalog');
    }
  }, [category, selectedCategory]);

  const handleLinkClick = () => {
    navigate('/catalog');
  };

  return (
    <>
      <TitleStyled level={1}>
        <LinkStyled type="link" onClick={handleLinkClick}>
          <ArrowLeftOutlined />
        </LinkStyled>
        {selectedCategory ? t(selectedCategory.name) : t('Категория не найдена')}
      </TitleStyled>
      <Products />
    </>
  );
};
