import { describe, expect, it } from '@jest/globals';
import * as React from 'react';
import { View } from 'react-native';
import * as ReactTestRenderer from 'react-test-renderer';
import type { Metrics } from '../SafeArea.types';
import { SafeAreaProvider } from '../SafeAreaContext';
import { SafeAreaView } from '../SafeAreaView';

const INITIAL_METRICS: Metrics = {
  insets: { top: 1, left: 2, right: 3, bottom: 4 },
  frame: { x: 0, y: 0, height: 100, width: 100 },
};

describe('SafeAreaView', () => {
  it('renders', () => {
    const component = ReactTestRenderer.create(
      <SafeAreaProvider initialMetrics={INITIAL_METRICS}>
        <SafeAreaView>
          <View />
        </SafeAreaView>
      </SafeAreaProvider>,
    );
    expect(component).toMatchSnapshot();
  });

  it('can override padding styles', () => {
    const component = ReactTestRenderer.create(
      <SafeAreaProvider initialMetrics={INITIAL_METRICS}>
        <SafeAreaView style={{ paddingTop: 0 }}>
          <View />
        </SafeAreaView>
      </SafeAreaProvider>,
    );
    expect(component).toMatchSnapshot();
  });

  it('can set edges', () => {
    const component = ReactTestRenderer.create(
      <SafeAreaProvider initialMetrics={INITIAL_METRICS}>
        <SafeAreaView edges={['top', 'bottom']}>
          <View />
        </SafeAreaView>
      </SafeAreaProvider>,
    );
    expect(component).toMatchSnapshot();
  });

  it('can set edges value type', () => {
    const component = ReactTestRenderer.create(
      <SafeAreaProvider initialMetrics={INITIAL_METRICS}>
        <SafeAreaView
          edges={{ top: 'additive', bottom: 'maximum' }}
          style={{ paddingTop: 24, paddingBottom: 24 }}
        >
          <View />
        </SafeAreaView>
      </SafeAreaProvider>,
    );
    expect(component).toMatchSnapshot();
  });
});
