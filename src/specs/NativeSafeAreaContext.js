/**
 * @flow strict-local
 */

import type { TurboModule } from 'react-native/Libraries/TurboModule/RCTExport';
import * as TurboModuleRegistry from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export interface Spec extends TurboModule {
  getConstants: () => {|
    initialWindowMetrics?: ?{|
      insets: {|
        top: Double,
        right: Double,
        bottom: Double,
        left: Double,
      |},
      frame: {|
        x: Double,
        y: Double,
        width: Double,
        height: Double,
      |},
    |},
  |};
}

export default TurboModuleRegistry.get<Spec>('RNCSafeAreaContext');
