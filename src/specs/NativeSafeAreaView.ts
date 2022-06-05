// @ts-expect-error: missing type definition for module
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
// @ts-expect-error: missing type definition for module
import type { WithDefault } from 'react-native/Libraries/Types/CodegenTypes';
import type { ViewProps, HostComponent } from 'react-native';

export interface NativeProps extends ViewProps {
  mode?: WithDefault<'padding' | 'margin', 'padding'>;
  // Should be `'top' | 'right' | 'bottom' | 'left'` but that generates invalid code.
  edges?: readonly string[];
}

export default codegenNativeComponent<NativeProps>('RNCSafeAreaView', {
  interfaceOnly: true,
}) as HostComponent<NativeProps>;
