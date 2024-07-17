import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface CarouselItemProps {
  imgUrl: string;
  width: number;
  height: number;
  onResponderRelease?: () => void;
}

export const CarouselItem: React.FC<CarouselItemProps> = ({
  imgUrl,
  onResponderRelease,
  width,
  height,
}) => {
  return (
    <View
      style={{
        width,
        height,
      }}
      onStartShouldSetResponder={() => true}
      onResponderRelease={onResponderRelease}
    >
      <Image source={{ uri: imgUrl }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
