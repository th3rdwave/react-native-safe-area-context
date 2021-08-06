#import "AppDelegate.h"

#ifndef RCT_USE_HERMES
#if __has_include(<reacthermes/HermesExecutorFactory.h>)
#define RCT_USE_HERMES 1
#else
#define RCT_USE_HERMES 0
#endif
#endif

#if RCT_USE_HERMES
#import <reacthermes/HermesExecutorFactory.h>
#else
#import <React/JSCExecutorFactory.h>
#endif

#import <React/CoreModulesPlugins.h>
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTCxxBridgeDelegate.h>
#import <React/RCTJavaScriptLoader.h>
#import <React/RCTLinkingManager.h>
#import <React/RCTImageLoader.h>
#import <React/RCTJSIExecutorRuntimeInstaller.h>
#import <React/RCTLocalAssetImageLoader.h>
#import <React/RCTGIFImageDecoder.h>
#import <React/RCTNetworking.h>
#import <React/RCTHTTPRequestHandler.h>
#import <React/RCTDataRequestHandler.h>
#import <React/RCTFileRequestHandler.h>
#import <React/RCTRootView.h>
#import <ReactCommon/RCTTurboModule.h>
#import <ReactCommon/RCTTurboModuleManager.h>

#import <cxxreact/JSExecutor.h>


//#ifdef FB_SONARKIT_ENABLED
//#import <FlipperKit/FlipperClient.h>
//#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
//#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
//#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
//#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
//#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>
//
//static void InitializeFlipper(UIApplication *application) {
//  FlipperClient *client = [FlipperClient sharedClient];
//  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
//  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
//  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
//  [client addPlugin:[FlipperKitReactPlugin new]];
//  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
//  [client start];
//}
//#endif

@interface AppDelegate() <RCTCxxBridgeDelegate, RCTTurboModuleManagerDelegate>
{
  RCTTurboModuleManager *_turboModuleManager;
}
@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  RCTEnableTurboModule(YES);

//#ifdef FB_SONARKIT_ENABLED
//  InitializeFlipper(application);
//#endif

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"SafeAreaViewExample"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"example/index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (std::unique_ptr<facebook::react::JSExecutorFactory>)jsExecutorFactoryForBridge:(RCTBridge *)bridge
{
  _turboModuleManager = [[RCTTurboModuleManager alloc] initWithBridge:bridge
                                                             delegate:self
                                                            jsInvoker:bridge.jsCallInvoker];
  [bridge setRCTTurboModuleRegistry:_turboModuleManager];

#if RCT_DEV
  /**
   * Eagerly initialize RCTDevMenu so CMD + d, CMD + i, and CMD + r work.
   * This is a stop gap until we have a system to eagerly init Turbo Modules.
   */
  [_turboModuleManager moduleForName:"RCTDevMenu"];
#endif

  __weak __typeof(self) weakSelf = self;
#if RCT_USE_HERMES
  return std::make_unique<facebook::react::HermesExecutorFactory>(
#else
  return std::make_unique<facebook::react::JSCExecutorFactory>(
#endif
      facebook::react::RCTJSIExecutorRuntimeInstaller([weakSelf, bridge](facebook::jsi::Runtime &runtime) {
        if (!bridge) {
          return;
        }
        __typeof(self) strongSelf = weakSelf;
        if (strongSelf) {
          auto syncRuntimeExecutor =
              [&](std::function<void(facebook::jsi::Runtime & runtime_)> &&callback) { callback(runtime); };
          [strongSelf->_turboModuleManager installJSBindingWithRuntimeExecutor:syncRuntimeExecutor];
        }
      }));
}

- (Class)getModuleClassFromName:(const char *)name
{
  Class cl = RCTCoreModulesClassProvider(name);
  if (cl != nil) {
    return cl;
  }
  return nil;
  // return TWModulesClassProvider(name);
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
                                                      jsInvoker:(std::shared_ptr<facebook::react::CallInvoker>)jsInvoker
{
  return nullptr;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
                                                     initParams:(const facebook::react::ObjCTurboModule::InitParams &)params
{
  return nullptr;
}

- (id<RCTTurboModule>)getModuleInstanceFromClass:(Class)moduleClass
{
  if (moduleClass == RCTImageLoader.class) {
    return [[moduleClass alloc] initWithRedirectDelegate:nil
        loadersProvider:^NSArray<id<RCTImageURLLoader>> *(__unused RCTModuleRegistry * moduleRegistry) {
          return @ [[RCTLocalAssetImageLoader new]];
        }
        decodersProvider:^NSArray<id<RCTImageDataDecoder>> *(__unused RCTModuleRegistry * moduleRegistry) {
          return @ [[RCTGIFImageDecoder new]];
        }];
  } else if (moduleClass == RCTNetworking.class) {
    return [[moduleClass alloc] initWithHandlersProvider:^NSArray<id<RCTURLRequestHandler>> *(__unused RCTModuleRegistry * moduleRegistry) {
      return @[
        [RCTHTTPRequestHandler new],
        [RCTDataRequestHandler new],
        [RCTFileRequestHandler new],
      ];
    }];
  }
  return [moduleClass new];
}

@end
