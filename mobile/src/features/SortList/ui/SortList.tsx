import React, { memo, RefObject, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Radio, RadioGroup, Text } from '@ui-kitten/components';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { shallow } from 'zustand/shallow';

import { useProductStore } from '@/entities/Product';
import { TextStyles } from '@/shared/libs/textStyles';
import { CustomModal } from '@/shared/ui/CustomModal';

interface SortListProps {
  refer: RefObject<BottomSheetModal>;
}

export const SortList: React.FC<SortListProps> = memo(({ refer }) => {
  const [getProducts, filters] = useProductStore(
    (state) => [state.getProducts, state.filters],
    shallow,
  );
  const { t } = useTranslation();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const sorts = [t('Популярное'), t('Дешевле'), t('Дороже'), t('Новинки')];

  const handleChangeRadio = (index: number) => {
    setSelectedIndex(index);
    switch (index) {
      case 0:
        getProducts({
          ...filters,
          sortBy: 'reviews_count',
          order: 'desc',
        });
        break;
      case 1:
        getProducts({
          ...filters,
          sortBy: 'discountPrice',
          order: 'asc',
        });
        break;
      case 2:
        getProducts({
          ...filters,
          sortBy: 'discountPrice',
          order: 'desc',
        });
        break;
      case 3:
        getProducts({
          ...filters,
          sortBy: 'createdAt',
          order: 'desc',
        });
        break;
    }
    refer.current?.dismiss();
  };

  return (
    <CustomModal refer={refer} title={t('Показать сначала')}>
      <RadioGroup selectedIndex={selectedIndex} onChange={handleChangeRadio}>
        {sorts.map((item) => (
          <Radio key={item}>
            {(evaProps) => (
              <Text {...evaProps} style={{ ...TextStyles.p1, ...styles.text }}>
                {item}
              </Text>
            )}
          </Radio>
        ))}
      </RadioGroup>
    </CustomModal>
  );
});

const styles = StyleSheet.create({
  text: {
    marginLeft: 10,
  },
});
