import { Catalog } from 'features/catalog';
import { useTranslation } from 'react-i18next';
import { TitleStyled } from './catalog.styles';

export const CatalogPage = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <TitleStyled level={1}>{t('Каталог')}</TitleStyled>
      <Catalog />
    </>
  );
};
