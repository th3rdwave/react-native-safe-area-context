# Contributing

## Development workflow

### Install dependencies

Use yarn to install development dependencies.

```sh
yarn install
```

If you plan to develop on iOS you will also need to install pods for the example app.

```sh
cd example/ios && npx pod install
```

### Example app

Start the example app to test your changes. You can use one of the following commands from the repo root, depending on the platform you want to use.

#### iOS

```sh
yarn example:ios
```

I also recommend opening `example/ios/SafeAreaViewExample.xcworkspace` in Xcode if you need to make changes to native code.

#### Android

```sh
yarn example:android
```

I also recommend opening `example/android` in Android Studio if you need to make changes to native code.

#### Expo and web

```sh
yarn example:expo
```

Use `ctrl+cmd+z` on iOS or `ctrl+m` on Android to open the dev menu and choose an example.

### Run tests

```sh
yarn test
```

### Open a pull request!
