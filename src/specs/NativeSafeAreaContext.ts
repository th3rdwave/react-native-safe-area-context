// @ts-expect-error: missing type definition for module
import type { Double } from 'react-native/Libraries/Types/CodegenTypes';
// @ts-expect-error: missing type definition for module
import type { TurboModule } from 'react-native/Libraries/TurboModule/RCTExport';
// @ts-expect-error: missing type definition for module
import * as TurboModuleRegistry from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export interface Spec extends TurboModule {
  getConstants: () => {
    initialWindowMetrics?: {
      insets: {
        top: Double;
        right: Double;
        bottom: Double;
        left: Double;
      };
      frame: {
        x: Double;
        y: Double;
        width: Double;
        height: Double;
      };
    };
  };
}

export default TurboModuleRegistry.get<Spec>('RNCSafeAreaContext');
