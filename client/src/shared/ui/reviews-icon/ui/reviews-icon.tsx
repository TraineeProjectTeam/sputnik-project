import Icon from '@ant-design/icons';
import { ReviewsSvg } from './reviews-svg';
import { GetProps } from 'antd';

type CustomIconComponentProps = GetProps<typeof Icon>;

export const ReviewsIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={ReviewsSvg} {...props} />;
};
