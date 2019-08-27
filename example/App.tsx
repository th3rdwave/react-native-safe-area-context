/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import * as React from 'react';
import { StyleSheet, ScrollView, View, Text, StatusBar } from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// import { SafeAreaProvider, useSafeArea } from 'react-native-safe-area-context'; in your app.
import { SafeAreaProvider, useSafeArea } from '../src';

type ForceInsets = 'always' | 'never';

const CompatSafeAreaView = ({
  forceInsets = {},
  children,
}: {
  forceInsets?: {
    top?: ForceInsets;
    right?: ForceInsets;
    bottom?: ForceInsets;
    left?: ForceInsets;
  };
  children?: React.ReactNode;
}) => {
  const insets = useSafeArea();
  const top = forceInsets.top === 'never' ? 0 : insets.top;
  const right = forceInsets.right === 'never' ? 0 : insets.right;
  const bottom = forceInsets.bottom === 'never' ? 0 : insets.bottom;
  const left = forceInsets.left === 'never' ? 0 : insets.left;
  return (
    <View
      style={{
        paddingTop: top,
        paddingRight: right,
        paddingBottom: bottom,
        paddingLeft: left,
      }}
    >
      {children}
    </View>
  );
};

const App = () => {
  const insets = useSafeArea();
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={false}
        backgroundColor="transparent"
      />
      <ScrollView
        contentInsetAdjustmentBehavior="never"
        style={styles.scrollView}
      >
        <CompatSafeAreaView>
          <Header />
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </CompatSafeAreaView>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          height: insets.top,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default () => (
  <SafeAreaProvider>
    <App />
  </SafeAreaProvider>
);
