import { EdgeInsets } from './SafeArea.types';
import { UIManager } from 'react-native';

const RNCSafeAreaViewConfig = UIManager.getViewManagerConfig(
  'RNCSafeAreaView',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) as any;

export default (RNCSafeAreaViewConfig?.Constants
  ? RNCSafeAreaViewConfig.Constants.initialWindowSafeAreaInsets
  : null) as EdgeInsets | null;
