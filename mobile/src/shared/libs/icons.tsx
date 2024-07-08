import Icon from 'react-native-vector-icons/MaterialIcons';

export interface IconProps {
  size: number;
  color: string;
}

export const HomeIcon = ({ size, color }: IconProps) => (
  <Icon name="home" size={size} color={color} />
);

export const CartIcon = ({ size, color }: IconProps) => (
  <Icon name="shopping-cart" size={size} color={color} />
);

export const AccountIcon = ({ size, color }: IconProps) => (
  <Icon name="person" size={size} color={color} />
);

export const ArrowRight = ({ size, color }: IconProps) => (
  <Icon name="chevron-right" size={size} color={color} />
);

export const ArrowLeft = ({ size, color }: IconProps) => (
  <Icon name="chevron-left" size={size} color={color} />
);
