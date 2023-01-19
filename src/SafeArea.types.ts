import type * as React from 'react';
import type { NativeSyntheticEvent, ViewProps } from 'react-native';

export type Edge = 'top' | 'right' | 'bottom' | 'left';

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

export interface NativeSafeAreaProviderProps extends ViewProps {
  children?: React.ReactNode;
  onInsetsChange: InsetChangeNativeCallback;
}

export interface NativeSafeAreaViewProps extends ViewProps {
  children?: React.ReactNode;
  mode?: 'padding' | 'margin';
  edges?: ReadonlyArray<Edge>;
}
