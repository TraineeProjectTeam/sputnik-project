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

export const ArrowBottom = ({ size, color }: IconProps) => (
  <Icon name="keyboard-arrow-down" size={size} color={color} />
);

export const Star = ({ size, color }: IconProps) => <Icon name="star" size={size} color={color} />;

export const ChatBubble = ({ size, color }: IconProps) => (
  <Icon name="chat-bubble" size={size} color={color} />
);

export const ShoppingBag = ({ size, color }: IconProps) => (
  <Icon name="shopping-bag" size={size} color={color} />
);

export const CheckCircle = ({ size, color }: IconProps) => (
  <Icon name="check-circle-outline" size={size} color={color} />
);

export const DeleteIcon = ({ size, color }: IconProps) => (
  <Icon name="delete" size={size} color={color} />
);

export const EditIcon = ({ size, color }: IconProps) => (
  <Icon name="edit" size={size} color={color} />
);

export const AddIcon = ({ size, color }: IconProps) => (
  <Icon name="add" size={size} color={color} />
);

export const RemoveIcon = ({ size, color }: IconProps) => (
  <Icon name="remove" size={size} color={color} />
);

export const CloseIcon = ({ size, color }: IconProps) => (
  <Icon name="close" size={size} color={color} />
);

export const CreditCardIcon = ({ size, color }: IconProps) => (
  <Icon name="credit-card" size={size} color={color} />
);

export const NumbersIcon = ({ size, color }: IconProps) => (
  <Icon name="numbers" size={size} color={color} />
);

export const EmojiIcon = ({ size, color }: IconProps) => (
  <Icon name="emoji-emotions" size={size} color={color} />
);

export const LocationIcon = ({ size, color }: IconProps) => (
  <Icon name="location-on" size={size} color={color} />
);

export const SortIcon = ({ size, color }: IconProps) => (
  <Icon name="swap-vert" size={size} color={color} />
);

export const FilterIcon = ({ size, color }: IconProps) => (
  <Icon name="filter-alt" size={size} color={color} />
);
