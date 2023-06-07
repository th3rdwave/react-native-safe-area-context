import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { WithDefault } from 'react-native/Libraries/Types/CodegenTypes';
import type { ViewProps, HostComponent } from 'react-native';
import { EdgeRecord } from '../SafeArea.types';

export interface NativeProps extends ViewProps {
  mode?: WithDefault<'padding' | 'margin', 'padding'>;
  edges?: EdgeRecord;
}

export default codegenNativeComponent<NativeProps>('RNCSafeAreaView', {
  interfaceOnly: true,
}) as HostComponent<NativeProps>;
