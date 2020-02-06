import { UIManager } from 'react-native';
import { EdgeInsets } from './SafeArea.types';

const RNCSafeAreaViewConfig = UIManager.getViewManagerConfig(
  'RNCSafeAreaView',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) as any;

export default (RNCSafeAreaViewConfig != null &&
RNCSafeAreaViewConfig.Constants != null
  ? RNCSafeAreaViewConfig.Constants.initialWindowSafeAreaInsets
  : null) as EdgeInsets | null;
