import React, { useRef } from 'react';
import { Animated, FlatList, NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';

import { Pagination } from './Pagination';
import { CarouselItem } from './CarouselItem';

interface CarouselProps {
  items: string[];
  onResponderRelease?: () => void;
  width: number;
  height: number;
}

export const Carousel: React.FC<CarouselProps> = ({ items, onResponderRelease, width, height }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  return (
    <View>
      <FlatList
        data={items}
        horizontal
        pagingEnabled
        viewabilityConfig={viewabilityConfig}
        onScroll={handleOnScroll}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <CarouselItem
            imgUrl={item}
            onResponderRelease={onResponderRelease}
            width={width}
            height={height}
          />
        )}
      />
      <Pagination data={items} scrollX={scrollX} width={width} />
    </View>
  );
};
