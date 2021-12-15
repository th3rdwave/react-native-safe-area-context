/**
 * @flow strict-local
 */

import type {
  DirectEventHandler,
  Double,
} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { HostComponent } from 'react-native/Libraries/Renderer/shims/ReactNativeTypes';
import type { ViewProps } from 'react-native/Libraries/Components/View/ViewPropTypes';

type Event = $ReadOnly<{|
  insets: $ReadOnly<{|
    top: Double,
    right: Double,
    bottom: Double,
    left: Double,
  |}>,
  frame: $ReadOnly<{|
    x: Double,
    y: Double,
    width: Double,
    height: Double,
  |}>,
|}>;

type NativeProps = $ReadOnly<{|
  ...ViewProps,

  onInsetsChange?: ?DirectEventHandler<Event, 'paperInsetsChange'>,
|}>;

export default (codegenNativeComponent<NativeProps>(
  'RNCSafeAreaProvider',
): HostComponent<NativeProps>);
