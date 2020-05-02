import { requireNativeComponent } from 'react-native';
import { NativeSafeAreaViewProps } from './SafeArea.types';

export default requireNativeComponent<NativeSafeAreaViewProps>(
  'RNCSafeAreaView',
);
