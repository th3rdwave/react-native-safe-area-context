# Contributing

## Development workflow

### Install dependencies

Use yarn to install development dependencies.

```sh
yarn install
```

If you don't have bundler installed:

```
gem install bundler
```

Move to the `example` directory and install dependencies there too.

```sh
cd example
yarn install
bundle install
```

```sh
cd ios && bundle exec pod install
```

### Example app

Start the example app to test your changes. You can use one of the following commands from the repo root, depending on the platform you want to use.

From the `example` directory:

#### iOS

```sh
yarn ios
```

I also recommend opening `example/ios/SafeAreaViewExample.xcworkspace` in Xcode if you need to make changes to native code.

#### Android

```sh
yarn android
```

I also recommend opening `example/android` in Android Studio if you need to make changes to native code.

Use `ctrl+cmd+z` on iOS or `ctrl+m` on Android to open the dev menu and choose an example.

### Run tests

```sh
yarn test
```

### Open a pull request!
