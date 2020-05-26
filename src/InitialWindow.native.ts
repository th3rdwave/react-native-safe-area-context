import { UIManager } from 'react-native';
import { Metrics } from './SafeArea.types';

const RNCSafeAreaProviderConfig = UIManager.getViewManagerConfig(
  'RNCSafeAreaProvider',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) as any;

export const initialWindowMetrics = (RNCSafeAreaProviderConfig != null &&
RNCSafeAreaProviderConfig.Constants != null
  ? RNCSafeAreaProviderConfig.Constants.initialWindowMetrics
  : null) as Metrics | null;

/**
 * @deprecated
 */
export const initialWindowSafeAreaInsets = initialWindowMetrics?.insets;
