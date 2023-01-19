/* global jest */

import React from 'react';

const MOCK_INITIAL_METRICS = {
  frame: {
    width: 320,
    height: 640,
    x: 0,
    y: 0,
  },
  insets: {
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
};

const RNSafeAreaContext = jest.requireActual('react-native-safe-area-context');

export default {
  ...RNSafeAreaContext,
  initialWindowMetrics: MOCK_INITIAL_METRICS,
  useSafeAreaInsets: () => {
    return MOCK_INITIAL_METRICS.insets;
  },
  useSafeAreaFrame: () => {
    return MOCK_INITIAL_METRICS.frame;
  },
  // Provide a simpler implementation with default values.
  SafeAreaProvider: ({ children, initialMetrics }) => {
    return (
      <RNSafeAreaContext.SafeAreaFrameContext.Provider
        value={initialMetrics?.frame ?? MOCK_INITIAL_METRICS.frame}
      >
        <RNSafeAreaContext.SafeAreaInsetsContext.Provider
          value={initialMetrics?.insets ?? MOCK_INITIAL_METRICS.insets}
        >
          {children}
        </RNSafeAreaContext.SafeAreaInsetsContext.Provider>
      </RNSafeAreaContext.SafeAreaFrameContext.Provider>
    );
  },
};
