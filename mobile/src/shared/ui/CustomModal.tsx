import React, { RefObject, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { TextStyles } from '../libs/textStyles';

interface CustomModalProps {
  title: string;
  refer: RefObject<BottomSheetModal>;
  children: JSX.Element;
}

export const CustomModal: React.FC<CustomModalProps> = ({ refer, title, children }) => {
  const closeBackdrop = () => {
    refer.current?.dismiss();
  };

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.5}
        onPress={closeBackdrop}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  return (
    <BottomSheetModal ref={refer} index={0} snapPoints={['40%']} backdropComponent={renderBackdrop}>
      <View style={styles.header}>
        <Text style={TextStyles.h5}>{title}</Text>
      </View>
      <View style={styles.container}>{children}</View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    paddingHorizontal: 15,
  },
  container: {
    paddingHorizontal: 15,
  },
});
