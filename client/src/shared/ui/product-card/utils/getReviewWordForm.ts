import { TFunction } from "i18next";

export const getReviewWordForm = (count: number, t: TFunction): string => {
  const lastDigit: number = count % 10;
  const lastTwoDigits: number = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return t('отзывов');
  }

  switch (lastDigit) {
    case 1:
      return t('отзыв');
    case 2:
    case 3:
    case 4:
      return t('отзыва');
    default:
      return t('отзывов');
  }
};
