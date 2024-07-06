import React from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import {
  SelectItem,
  SelectProps as Props,
  Select as UiSelect,
  IndexPath,
} from '@ui-kitten/components';

interface SelectProps<T extends FieldValues> extends UseControllerProps<T>, Props {
  label: string;
  items: Array<{ value: string; label: string }>;
}

export const Select = <T extends FieldValues>({
  control,
  name,
  label,
  items,
  defaultValue,
  ...props
}: SelectProps<T>) => {
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

  const indexObj = (value: string) => items.findIndex((x) => x.value === value);
  const { t } = useTranslation();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <UiSelect
          label={label}
          value={t(items[indexObj(value)].label)}
          style={styles.select}
          selectedIndex={selectedIndex}
          onSelect={(index: any) => {
            onChange(items[index.row].value);
            setSelectedIndex(index);
          }}
          {...props}
        >
          {items.map((item, index) => (
            <SelectItem key={index} title={t(item.label)} />
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
