import React from 'react';
import { StyleSheet } from 'react-native';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import {
  SelectItem,
  SelectProps as Props,
  Select as UiSelect,
  IndexPath,
} from '@ui-kitten/components';

interface SelectProps<T extends FieldValues> extends UseControllerProps<T>, Props {
  label: string;
  items: Array<string>;
}

export const Select = <T extends FieldValues>({
  control,
  name,
  label,
  items,
  defaultValue,
  ...props
}: SelectProps<T>) => {
  const [selectedIndex, setSelectedIndex] = React.useState<IndexPath>(new IndexPath(0));

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <UiSelect
          label={label}
          value={value}
          style={styles.select}
          selectedIndex={selectedIndex}
          onSelect={(index: any) => {
            onChange(items[index.row]);
            setSelectedIndex(index);
          }}
          {...props}
        >
          {items.map((item, index) => (
            <SelectItem key={index} title={item} />
          ))}
        </UiSelect>
      )}
    />
  );
};

const styles = StyleSheet.create({
  select: {
    marginBottom: 10,
  },
});
