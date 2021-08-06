/**
 * @flow strict-local
 */

import type { DirectEventHandler } from 'react-native/Libraries/Types/CodegenTypes';

import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { HostComponent } from 'react-native/Libraries/Renderer/shims/ReactNativeTypes';

import type { ViewProps } from 'react-native/Libraries/Components/View/ViewPropTypes';

type Event = $ReadOnly<{|
  insets: $ReadOnly<{|
    top: number,
    right: number,
    bottom: number,
    left: number,
  |}>,
  frame: $ReadOnly<{|
    x: number,
    y: number,
    width: number,
    height: number,
  |}>,
|}>;

type NativeProps = $ReadOnly<{|
  ...ViewProps,

  onInsetsChange?: ?DirectEventHandler<Event, 'paperInsetsChange'>,
|}>;

export default (codegenNativeComponent<NativeProps>('SafeAreaProvider', {
  interfaceOnly: true,
}): HostComponent<NativeProps>);
