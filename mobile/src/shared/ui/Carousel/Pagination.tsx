import { Colors } from '@/shared/libs/colors';
import React from 'react';
import { StyleSheet, Animated, View } from 'react-native';

interface PaginationProps {
  data: string[];
  scrollX: Animated.Value;
  width: number;
}

export const Pagination: React.FC<PaginationProps> = ({ data, scrollX, width }) => {
  return (
    <View style={styles.container}>
      {data.map((_: string, idx: number) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [6, 6, 6],
          extrapolate: 'clamp',
        });

        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: ['#ccc', Colors.Primary500, '#ccc'],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={idx.toString()}
            style={{
              ...styles.dot,
              width: dotWidth,
              backgroundColor,
            }}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    marginHorizontal: 2,
    backgroundColor: '#ccc',
  },
  dotActive: {
    backgroundColor: '#000',
  },
});
