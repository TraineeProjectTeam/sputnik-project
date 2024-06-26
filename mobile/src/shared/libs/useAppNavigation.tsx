import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/app/navigation/navigationTypes';

export const useAppNavigation = () => {
  return useNavigation<NavigationProp<RootStackParamList>>();
};
