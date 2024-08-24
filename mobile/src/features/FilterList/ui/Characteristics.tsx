import { memo, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Divider } from '@ui-kitten/components';

import { TextStyles } from '@/shared/libs/textStyles';
import { Colors } from '@/shared/libs/colors';
import { ICharacteristic } from '@/shared/libs/types';
import { CharacteristicsValue } from './CharacteristicsValue';

export const Characteristics = memo(
  ({
    title,
    items,
    characteristics,
    setCharacteristics,
    deleteCharacteristics,
  }: {
    title: string;
    items: string[];
    characteristics: ICharacteristic[];
    setCharacteristics: (title: string, value: string) => void;
    deleteCharacteristics: (title: string, value: string) => void;
  }) => {
    let formDataValues = characteristics.find((value) => value.characteristic === title)?.values;

    if (formDataValues === undefined) {
      formDataValues = [];
    }

    const [values, setValues] = useState<string[]>(formDataValues);

    useEffect(() => {
      setValues(formDataValues);
    }, [characteristics]);

    return (
      <View>
        <Text style={{ ...TextStyles.p1, ...styles.title }}>{title}</Text>
        <View style={styles.container}>
          {items.map((item) => (
            <CharacteristicsValue
              key={item}
              item={item}
              title={title}
              values={values}
              setValues={setValues}
              setCharacteristics={setCharacteristics}
              deleteCharacteristics={deleteCharacteristics}
            />
          ))}
        </View>
        <Divider style={styles.divider} />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
  },
  title: {
    marginBottom: 5,
  },
  divider: {
    marginVertical: 8,
    backgroundColor: Colors.Basic500,
  },
});
