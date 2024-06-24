import Reactotron from 'reactotron-react-native';

import mmkvPlugin from 'reactotron-react-native-mmkv';
import { storage } from '@/shared/libs/storage';

Reactotron.configure({
  name: 'Ozon 2.0',
})
  .useReactNative({ networking: true })
  .use(mmkvPlugin({ storage }))
  .connect();
