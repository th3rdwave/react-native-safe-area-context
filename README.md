# react-native-safe-area-context

[![npm](https://img.shields.io/npm/v/react-native-safe-area-context)](https://www.npmjs.com/package/react-native-safe-area-context) ![Supports Android, iOS, web, macOS and Windows](https://img.shields.io/badge/platforms-android%20%7C%20ios%20%7C%20web%20%7C%20macos%20%7C%20windows-lightgrey.svg) ![MIT License](https://img.shields.io/npm/l/react-native-safe-area-context.svg)

[![JavaScript tests](https://github.com/th3rdwave/react-native-safe-area-context/workflows/JavaScript%20tests/badge.svg)](https://github.com/th3rdwave/react-native-safe-area-context/actions?query=workflow%3AJavaScript%20tests) [![iOS build](https://github.com/th3rdwave/react-native-safe-area-context/workflows/iOS%20build/badge.svg)](https://github.com/th3rdwave/react-native-safe-area-context/actions?query=workflow%3AiOS%20build) [![Android build](https://github.com/th3rdwave/react-native-safe-area-context/workflows/Android%20build/badge.svg)](https://github.com/th3rdwave/react-native-safe-area-context/actions?query=workflow%3AAndroid%20build)

A flexible way to handle safe area, also works on Android and Web!

## Getting started

```
npm install react-native-safe-area-context
```

You then need to link the native parts of the library for the platforms you are using.

#### Linking in React Native >= 0.60

Linking the package is not required anymore with [Autolinking](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md).

- **iOS Platform:**

  `$ npx pod-install`

#### Linking in React Native < 0.60

The easiest way to link the library is using the CLI tool by running this command from the root of your project:

```
react-native link react-native-safe-area-context
```

If you can't or don't want to use the CLI tool, you can also manually link the library using the instructions below (click on the arrow to show them):

<details>
<summary>Manually link the library on iOS</summary>

Either follow the [instructions in the React Native documentation](https://facebook.github.io/react-native/docs/linking-libraries-ios#manual-linking) to manually link the framework or link using [Cocoapods](https://cocoapods.org) by adding this to your `Podfile`:

```ruby
pod 'react-native-safe-area-context', :path => '../node_modules/react-native-safe-area-context'
```

</details>

<details>
<summary>Manually link the library on Android</summary>

Make the following changes:

#### `android/settings.gradle`

```groovy
include ':react-native-safe-area-context'
project(':react-native-safe-area-context').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-safe-area-context/android')
```

#### `android/app/build.gradle`

```groovy
dependencies {
   ...
   implementation project(':react-native-safe-area-context')
}
```

#### `android/app/src/main/.../MainApplication.java`

On top, where imports are:

```java
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
```

Add the `SafeAreaContextPackage` class to your list of exported packages.

```java
@Override
protected List<ReactPackage> getPackages() {
    return Arrays.asList(
            new MainReactPackage(),
            ...
            new SafeAreaContextPackage()
    );
}
```

</details>

## Usage

This library has 2 important concepts, if you are familiar with React Context this is very similar.

### Providers

The [SafeAreaProvider](#safeareaprovider) component is a `View` from where insets provided by [Consumers](#consumers) are relative to. This means that if this view overlaps with any system elements (status bar, notches, etc.) these values will be provided to descendent consumers. Usually you will have one provider at the top of your app.

### Consumers

Consumers are components and hooks that allow using inset values provided by the nearest parent [Provider](#providers). Values are always relative to a provider and not to these components.

- [SafeAreaView](#safeareaview) is the preferred way to consume insets. This is a regular `View` with insets applied as extra padding or margin. It offers better performance by applying insets natively and avoids flickers that can happen with the other JS based consumers.

- [useSafeAreaInsets](#usesafeareainsets) offers more flexibility, but can cause some layout flicker in certain cases. Use this if you need more control over how insets are applied.

## API

### SafeAreaProvider

You should add `SafeAreaProvider` in your app root component. You may need to add it in other places like the root of modals and routes when using `react-native-screen`.

Note that providers should not be inside a `View` that is animated with `Animated` or inside a `ScrollView` since it can cause very frequent updates.

#### Example

```js
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  return <SafeAreaProvider>...</SafeAreaProvider>;
}
```

#### Props

Accepts all [View](https://reactnative.dev/docs/view#props) props. Has a default style of `{flex: 1}`.

##### `initialMetrics`

Optional, defaults to `null`.

Can be used to provide the initial value for frame and insets, this allows rendering immediatly. See [optimization](#optimization) for more information on how to use this prop.

### SafeAreaView

`SafeAreaView` is a regular `View` component with the safe area insets applied as padding or margin.

Padding or margin styles are added to the insets, for example `style={{paddingTop: 10}}` on a `SafeAreaView` that has insets of 20 will result in a top padding of 30.

#### Example

```js
import { SafeAreaView } from 'react-native-safe-area-context';

function SomeComponent() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'red' }}>
      <View style={{ flex: 1, backgroundColor: 'blue' }} />
    </SafeAreaView>
  );
}
```

### Props

Accepts all [View](https://reactnative.dev/docs/view#props) props.

##### `edges`

Optional, array of `top`, `right`, `bottom`, and `left`. Defaults to all.

Sets the edges to apply the safe area insets to.

For example if you don't want insets to apply to the top edge because the view does not touch the top of the screen you can use:

```js
<SafeAreaView edges={['right', 'bottom', 'left']} />
```

##### `mode`

Optional, `padding` (default) or `margin`.

Apply the safe area to either the padding or the margin.

This can be useful for example to create a safe area aware separator component:

```js
<SafeAreaView mode="margin" style={{ height: 1, backgroundColor: '#eee' }} />
```

### useSafeAreaInsets

Returns the safe area insets of the nearest provider. This allows manipulating the inset values from JavaScript. Note that insets are not updated synchronously so it might cause a slight delay for example when rotating the screen.

Object with `{ top: number, right: number, bottom: number, left: number }`.

```js
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function HookComponent() {
  const insets = useSafeAreaInsets();

  return <View style={{ paddingBottom: Math.max(insets.bottom, 16) }} />;
}
```

### useSafeAreaFrame

Returns the frame of the nearest provider. This can be used as an alternative to the `Dimensions` module.

Object with `{ x: number, y: number, width: number, height: number }`

### `SafeAreaInsetsContext`

React Context with the value of the safe area insets.

Can be used with class components:

```js
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

class ClassComponent extends React.Component {
  render() {
    return (
      <SafeAreaInsetsContext.Consumer>
        {(insets) => <View style={{ paddingTop: insets.top }} />}
      </SafeAreaInsetsContext.Consumer>
    );
  }
}
```

### `withSafeAreaInsets`

Higher order component that provides safe area insets as the `insets` prop.

### `SafeAreaFrameContext`

React Context with the value of the safe area frame.

### `initialWindowMetrics`

Insets and frame of the window on initial render. This can be used with the `initialMetrics` from `SafeAreaProvider`. See [optimization](#optimization) for more information.

Object with:

```ts
{
  frame: { x: number, y: number, width: number, height: number },
  insets: { top: number, left: number, right: number, bottom: number },
}
```

## Deprecated apis

### useSafeArea

Use `useSafeAreaInsets` intead.

### SafeAreaConsumer

Use `SafeAreaInsetsContext.Consumer` instead.

### SafeAreaContext

Use `SafeAreaInsetsContext` instead.

### initialWindowSafeAreaInsets

Use `initialWindowMetrics` instead.

## Web SSR

If you are doing server side rendering on the web you can use `initialMetrics` to inject insets and frame value based on the device the user has, or simply pass zero values. Since insets measurement is async it will break rendering your page content otherwise.

## Optimization

If you can, use `SafeAreaView`. It's implemented natively so when rotating the device, there is no delay from the asynchronous bridge.

To speed up the initial render, you can import `initialWindowMetrics` from this package and set as the `initialMetrics` prop on the provider as described in Web SSR. You cannot do this if your provider remounts, or you are using `react-native-navigation`.

```js
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      ...
    </SafeAreaProvider>
  );
}
```

## Testing

When testing components nested under `SafeAreaProvider`, ensure to pass `initialMetrics` to
provide mock data for frame and insets and ensure the provider renders its children.

```js
export function TestSafeAreaProvider({ children }) {
  return (
    <SafeAreaProvider
      initialMetrics={{
        frame: { x: 0, y: 0, width: 0, height: 0 },
        insets: { top: 0, left: 0, right: 0, bottom: 0 },
      }}
    >
      {children}
    </SafeAreaProvider>
  );
}
```

## Contributing

See the [Contributing Guide](CONTRIBUTING.md)
