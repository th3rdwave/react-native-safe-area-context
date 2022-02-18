/**
 * @flow strict-local
 */

import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { WithDefault } from 'react-native/Libraries/Types/CodegenTypes';
import type { ViewProps } from 'react-native/Libraries/Components/View/ViewPropTypes';

type NativeProps = $ReadOnly<{|
  ...ViewProps,

  mode?: WithDefault<'padding' | 'margin', 'padding'>,
  // Should be `'top' | 'right' | 'bottom' | 'left'` but that generates invalid code.
  edges?: ?$ReadOnlyArray<string>,
|}>;

export default (codegenNativeComponent<NativeProps>('RNCSafeAreaView', {
  interfaceOnly: true,
}): HostComponent<NativeProps>);
