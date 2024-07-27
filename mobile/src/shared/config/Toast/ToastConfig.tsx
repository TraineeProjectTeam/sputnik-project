import { ErrorToast, SuccessToast, ToastProps } from 'react-native-toast-message';

import { Colors } from '@/shared/libs/colors';
import { TextStyles } from '@/shared/libs/textStyles';

export const toastConfig = {
  success: (props: ToastProps) => (
    <SuccessToast
      {...props}
      style={{ borderLeftColor: Colors.Success400, height: 40, width: 250 }}
      text1Style={TextStyles.c2}
    />
  ),

  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: Colors.Danger400, height: 40, width: 250 }}
      text1Style={TextStyles.c2}
    />
  ),
};
