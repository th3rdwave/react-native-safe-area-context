#if TARGET_OS_IPHONE
#import <UIKit/UIKit.h>
#elif TARGET_OS_OSX
#import <AppKit/AppKit.h>
#endif

#import <React/RCTView.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNCSafeAreaProvider : RCTView

@property (nonatomic, copy) RCTBubblingEventBlock onInsetsChange;

@end

NS_ASSUME_NONNULL_END
