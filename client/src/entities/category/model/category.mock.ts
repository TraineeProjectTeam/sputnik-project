import { TFunction } from 'i18next';
import { ICategory } from './category.types';

export const categoriesData = (t: TFunction): ICategory[] => {
  return [
    {
      id: 'clothing',
      name: 'Одежда',
      text: t('Одежда'),
      image: 'https://i.ibb.co/ZLQ1c7s/1.png',
    },
    {
      id: 'electronics',
      name: 'Электроника',
      text: t('Электроника'),
      image: 'https://i.ibb.co/jrW3d1F/2.png',
    },
    {
      id: 'footwear',
      name: 'Обувь',
      text: t('Обувь'),
      image: 'https://i.ibb.co/7GtGX5h/3.png',
    },
    {
      id: 'homeAndGarden',
      name: 'Дом и сад',
      text: t('Дом и сад'),
      image: 'https://i.ibb.co/qg0XDvM/4.png',
    },
    {
      id: 'childrensGoods',
      name: 'Детские товары',
      text: t('Детские товары'),
      image: 'https://i.ibb.co/kSpd0vG/5.png',
    },
    {
      id: 'beautyAndHealth',
      name: 'Красота и здоровье',
      text: t('Красота и здоровье'),
      image: 'https://i.ibb.co/pWCXKfh/6.png',
    },
    {
      id: 'homeAppliances',
      name: 'Бытовая техника',
      text: t('Бытовая техника'),
      image: 'https://i.ibb.co/Rp7rzdf/7.png',
    },
    {
      id: 'sportsAndLeisure',
      name: 'Спорт и отдых',
      text: t('Спорт и отдых'),
      image: 'https://i.ibb.co/x1LwdDV/8.png',
    },
    {
      id: 'books',
      name: 'Книги',
      text: t('Книги'),
      image: 'https://i.ibb.co/cYFSTbS/9.png',
    },
    {
      id: 'petSupplies',
      name: 'Товары для животных',
      text: t('Товары для животных'),
      image: 'https://i.ibb.co/pw6fCtq/10.png',
    },
  ];
};
