import { NativeSyntheticEvent, ViewStyle } from 'react-native';

export interface EdgeInsets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export type InsetChangedEvent = NativeSyntheticEvent<{ insets: EdgeInsets }>;

export type InsetChangeNativeCallback = (event: InsetChangedEvent) => void;

export interface NativeSafeAreaViewProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  onInsetsChange: InsetChangeNativeCallback;
}
