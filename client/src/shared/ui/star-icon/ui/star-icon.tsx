import Icon from '@ant-design/icons';
import { StarSvg } from './star-svg';
import { GetProps } from 'antd';

type CustomIconComponentProps = GetProps<typeof Icon>;

export const StarIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={StarSvg} {...props} />;
};
