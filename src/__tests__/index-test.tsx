import * as React from 'react';
import * as ReactTestRenderer from 'react-test-renderer';
import { View, UIManager } from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeArea } from '../index';
import NativeSafeAreaView from '../NativeSafeAreaView';

const PrintInsetsTestView = () => {
  const insets = useSafeArea();
  return (
    <View
      style={{
        top: insets.top,
        left: insets.left,
        bottom: insets.bottom,
        right: insets.right,
      }}
    />
  );
};

describe('SafeAreaProvider', () => {
  it('renders', () => {
    const component = ReactTestRenderer.create(<SafeAreaProvider />);
    expect(component).toMatchSnapshot();
  });

  it('does not render child until inset values are received', () => {
    const component = ReactTestRenderer.create(
      <SafeAreaProvider>
        <PrintInsetsTestView />
      </SafeAreaProvider>,
    );
    expect(component).toMatchSnapshot();
  });

  it('renders child when inset values are received', () => {
    const component = ReactTestRenderer.create(
      <SafeAreaProvider>
        <PrintInsetsTestView />
      </SafeAreaProvider>,
    );
    expect(component).toMatchSnapshot();
    const { onInsetsChange } = component.root.findByType(
      NativeSafeAreaView,
    ).props;
    ReactTestRenderer.act(() => {
      onInsetsChange({
        nativeEvent: { insets: { top: 1, left: 2, right: 3, bottom: 4 } },
      });
    });
    expect(component).toMatchSnapshot();
  });

  it('supports setting initial insets', () => {
    const component = ReactTestRenderer.create(
      <SafeAreaProvider
        initialSafeAreaInsets={{ top: 1, left: 2, right: 3, bottom: 4 }}
      >
        <PrintInsetsTestView />
      </SafeAreaProvider>,
    );
    expect(component).toMatchSnapshot();
  });

  it('uses parent insets when available', () => {
    const component = ReactTestRenderer.create(
      <SafeAreaProvider
        initialSafeAreaInsets={{ top: 1, left: 2, right: 3, bottom: 4 }}
      >
        <SafeAreaProvider>
          <PrintInsetsTestView />
        </SafeAreaProvider>
      </SafeAreaProvider>,
    );
    expect(component).toMatchSnapshot();
  });

  it('uses inner insets', () => {
    const component = ReactTestRenderer.create(
      <SafeAreaProvider
        initialSafeAreaInsets={{ top: 1, left: 2, right: 3, bottom: 4 }}
      >
        <SafeAreaProvider
          initialSafeAreaInsets={{ top: 2, left: 3, right: 4, bottom: 5 }}
        >
          <PrintInsetsTestView />
        </SafeAreaProvider>
      </SafeAreaProvider>,
    );
    expect(component).toMatchSnapshot();
  });

  it('throws when no provider is rendered', () => {
    // Silence the React error boundary warning; we expect an uncaught error.
    const consoleErrorMock = jest
      .spyOn(console, 'error')
      .mockImplementation(message => {
        if (message.startsWith('The above error occured in the ')) {
          return;
        }
      });
    expect(() => {
      ReactTestRenderer.create(<PrintInsetsTestView />);
    }).toThrow(
      'No safe area value available. Make sure you are rendering `<SafeAreaProvider>` at the top of your app.',
    );

    consoleErrorMock.mockRestore();
  });
});

describe('SafeAreaView', () => {
  it('renders', () => {
    const component = ReactTestRenderer.create(
      <SafeAreaProvider
        initialSafeAreaInsets={{ top: 1, left: 2, right: 3, bottom: 4 }}
      >
        <SafeAreaView>
          <View />
        </SafeAreaView>
      </SafeAreaProvider>,
    );
    expect(component).toMatchSnapshot();
  });

  it('can override padding styles', () => {
    const component = ReactTestRenderer.create(
      <SafeAreaProvider
        initialSafeAreaInsets={{ top: 1, left: 2, right: 3, bottom: 4 }}
      >
        <SafeAreaView style={{ paddingTop: 0 }}>
          <View />
        </SafeAreaView>
      </SafeAreaProvider>,
    );
    expect(component).toMatchSnapshot();
  });
});

describe('initialWindowSafeAreaInsets', () => {
  it('is null when no view config is available', () => {
    jest.resetModules();
    expect(require('../index').initialWindowSafeAreaInsets).toBe(null);
  });

  it('it uses the constant provided by the view config', () => {
    jest.resetModules();
    const testInsets = {
      top: 20,
      left: 0,
      right: 0,
      bottom: 0,
    };
    UIManager.getViewManagerConfig = jest.fn(name => {
      if (name === 'RNCSafeAreaView') {
        return {
          Commands: {},
          Constants: {
            initialWindowSafeAreaInsets: testInsets,
          },
        };
      }
      return { Commands: {} };
    });

    expect(require('../index').initialWindowSafeAreaInsets).toBe(testInsets);
    expect(UIManager.getViewManagerConfig).toBeCalledWith('RNCSafeAreaView');
  });
});
