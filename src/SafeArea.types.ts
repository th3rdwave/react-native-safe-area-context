import { NativeSyntheticEvent, ViewStyle, ViewProps } from 'react-native';

export type Edges =
  | 'none'
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'horizontal'
  | 'vertical'
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'not-top'
  | 'not-right'
  | 'not-bottom'
  | 'not-left'
  | 'all';

export interface EdgeInsets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Metrics {
  insets: EdgeInsets;
  frame: Rect;
}

export type InsetChangedEvent = NativeSyntheticEvent<Metrics>;

export type InsetChangeNativeCallback = (event: InsetChangedEvent) => void;

export interface NativeSafeAreaProviderProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  onInsetsChange: InsetChangeNativeCallback;
}

export type NativeSafeAreaViewProps = ViewProps & {
  children?: React.ReactNode;
  emulateUnlessSupported?: boolean;
  edges?: Edges;
};
