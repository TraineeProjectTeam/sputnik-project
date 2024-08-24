import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { CartProductList } from '@/widgets/CartProductList';
import { usePickupPointStore } from '@/entities/PickupPoint';
import { PickupPointList } from '@/features/PickupPointList';

import { Colors } from '@/shared/libs/colors';
import { ArrowBottom } from '@/shared/libs/icons';
import { TextStyles } from '@/shared/libs/textStyles';

export const CartScreen = () => {
  const { isLoading, getPickupPoints, pickupPoints } = usePickupPointStore();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { t } = useTranslation();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleChangeRadio = (index: number) => {
    setSelectedIndex(index);
    bottomSheetModalRef.current?.dismiss();
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  useEffect(() => {
    getPickupPoints();
  }, []);

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePresentModalPress} style={styles.pressable}>
        <Text style={TextStyles.s2}>
          {t('Пункт выдачи:')}
          {isLoading
            ? t('Загрузка...')
            : ` ${pickupPoints[selectedIndex]?.address.street_name}, ${pickupPoints[selectedIndex]?.address.street_number}`}
        </Text>
        <ArrowBottom size={16} color={Colors.Basic600} />
      </Pressable>
      <CartProductList pickupPointId={pickupPoints[selectedIndex]?._id} />
      <PickupPointList
        refer={bottomSheetModalRef}
        selectedIndex={selectedIndex}
        handleChangeRadio={handleChangeRadio}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pressable: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
