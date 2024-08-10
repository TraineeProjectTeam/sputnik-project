import React from 'react';
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useTranslation } from 'react-i18next';
import { Radio, RadioGroup } from '@ui-kitten/components';

import { usePickupPointStore } from '@/entities/PickupPoint';
import { Colors } from '@/shared/libs/colors';
import { CloseIcon } from '@/shared/libs/icons';
import { TextStyles } from '@/shared/libs/textStyles';

const windowHeight = Dimensions.get('window').height;

interface PickupPointListProps {
  isVisible: boolean;
  close: () => void;
  selectedIndex: number;
  handleChangeRadio: (index: number) => void;
}

export const PickupPointList: React.FC<PickupPointListProps> = ({
  isVisible,
  close,
  selectedIndex,
  handleChangeRadio,
}) => {
  const { pickupPoints } = usePickupPointStore();
  const { t } = useTranslation();

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      onRequestClose={close}
      style={styles.modal}
    >
      <View style={{ ...styles.transparentBg, height: windowHeight }}>
        <View style={{ ...styles.bottomSheet, height: windowHeight * 0.4 }}>
          <View style={styles.header}>
            <Text style={TextStyles.h6}>{t('Выберите адрес доставки')}</Text>
            <TouchableOpacity onPress={close}>
              <CloseIcon size={24} color={Colors.Basic700} />
            </TouchableOpacity>
          </View>
          <View>
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
          </View>
        </View>
      </View>
    </Modal>
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
