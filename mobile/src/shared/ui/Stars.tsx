import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Star } from '../libs/icons';
import { Colors } from '../libs/colors';

interface StarsProps {
  rating: number;
}

export const Stars: React.FC<StarsProps> = ({ rating }) => {
  return (
    <View style={styles.stars}>
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={24} color={i < rating ? Colors.Warning400 : Colors.Basic200} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  stars: {
    display: 'flex',
    flexDirection: 'row',
  },
});
