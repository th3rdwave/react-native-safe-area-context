# react-native-safe-area-context

A flexible way to handle safe area, also works on Android!

## Getting started

Install the library using either Yarn:

```
yarn add react-native-safe-area-context
```

or npm:

```
npm install --save react-native-safe-area-context
```

You then need to link the native parts of the library for the platforms you are using. The easiest way to link the library is using the CLI tool by running this command from the root of your project:

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
            new SafeAreaContextPackage()
    );
}
```
</details>

## Example

```js
import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaConsumer, useSafeArea } from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider>
      <HookComponent />
      <ClassComponent />
    </SafeAreaProvider>
  );
}

// With hooks
function HookComponent() {
  const insets = useSafeArea();

  return <View style={{ paddingTop: insets.top }} />;
}

// With consumer
class ClassComponent extends React.Component {
  render() {
    return (
      <SafeAreaConsumer>
        {insets => <View style={{ paddingTop: insets.top }} />}
      </SafeAreaConsumer>
    );
  }
}


```
