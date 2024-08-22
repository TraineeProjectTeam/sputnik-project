import React, { RefObject } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Radio, RadioGroup } from '@ui-kitten/components';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { usePickupPointStore } from '@/entities/PickupPoint';
import { TextStyles } from '@/shared/libs/textStyles';
import { CustomModal } from '@/shared/ui/CustomModal';

interface PickupPointListProps {
  refer: RefObject<BottomSheetModal>;
  selectedIndex: number;
  handleChangeRadio: (index: number) => void;
}

export const PickupPointList: React.FC<PickupPointListProps> = ({
  refer,
  selectedIndex,
  handleChangeRadio,
}) => {
  const { pickupPoints } = usePickupPointStore();
  const { t } = useTranslation();

  return (
    <CustomModal refer={refer} title={t('Выберите адрес доставки')}>
      <ScrollView>
        <RadioGroup selectedIndex={selectedIndex} onChange={handleChangeRadio}>
          {pickupPoints.map((pickupPoint) => (
            <Radio key={pickupPoint._id} style={styles.radio}>
              <View>
                <Text style={TextStyles.p1}>
                  {`${pickupPoint.address.city}, ${pickupPoint.address.street_name}, ${pickupPoint.address.street_number}`}
                </Text>
              </View>
            </Radio>
          ))}
        </RadioGroup>
      </ScrollView>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 23,
    paddingHorizontal: 25,
  },
  transparentBg: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  modal: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    paddingVertical: 5,
  },
});
