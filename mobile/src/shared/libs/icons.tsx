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
  <Icon name="account-circle" size={size} color={color} />
);
