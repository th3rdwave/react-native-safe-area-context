import { UIManager } from 'react-native';
import { Metrics } from './SafeArea.types';

const RNCSafeAreaViewConfig = UIManager.getViewManagerConfig(
  'RNCSafeAreaView',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) as any;

export const initialWindowMetrics = (RNCSafeAreaViewConfig != null &&
RNCSafeAreaViewConfig.Constants != null
  ? RNCSafeAreaViewConfig.Constants.initialWindowMetrics
  : null) as Metrics | null;

/**
 * @deprecated
 */
export const initialWindowSafeAreaInsets = initialWindowMetrics?.insets;
