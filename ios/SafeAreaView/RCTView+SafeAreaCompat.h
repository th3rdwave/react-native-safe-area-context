#import <React/RCTDefines.h>
#import <React/RCTView.h>
#import <UIKit/UIKit.h>

RCT_EXTERN BOOL
UIEdgeInsetsEqualToEdgeInsetsWithThreshold(UIEdgeInsets insets1, UIEdgeInsets insets2, CGFloat threshold);

NS_ASSUME_NONNULL_BEGIN

@interface UIView (SafeAreaCompat)

- (BOOL)nativeSafeAreaSupport;
- (UIEdgeInsets)safeAreaInsetsOrEmulate;

@end

NS_ASSUME_NONNULL_END
