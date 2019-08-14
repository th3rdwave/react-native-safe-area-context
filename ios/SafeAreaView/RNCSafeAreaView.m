// Simplified version of https://github.com/facebook/react-native/blob/master/React/Views/SafeAreaView/RCTSafeAreaView.m

#import "RNCSafeAreaView.h"

#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>

@implementation RNCSafeAreaView {
  UIEdgeInsets _currentSafeAreaInsets;
}

RCT_NOT_IMPLEMENTED(- (instancetype)initWithCoder:(NSCoder *)decoder)
RCT_NOT_IMPLEMENTED(- (instancetype)initWithFrame:(CGRect)frame)

- (BOOL)isSupportedByOS
{
  return [self respondsToSelector:@selector(safeAreaInsets)];
}

- (UIEdgeInsets)realOrEmulateSafeAreaInsets
{
#if defined(__IPHONE_OS_VERSION_MAX_ALLOWED) && __IPHONE_OS_VERSION_MAX_ALLOWED >= 110000 /* __IPHONE_11_0 */
  if (self.isSupportedByOS) {
    if (@available(iOS 11.0, *)) {
      return self.safeAreaInsets;
    }
  }
#endif
  return self.emulatedSafeAreaInsets;
}

- (UIEdgeInsets)emulatedSafeAreaInsets
{
  UIViewController* vc = self.reactViewController;

  if (!vc) {
    return UIEdgeInsetsZero;
  }

  CGFloat topLayoutOffset = vc.topLayoutGuide.length;
  CGFloat bottomLayoutOffset = vc.bottomLayoutGuide.length;
  CGRect safeArea = vc.view.bounds;
  safeArea.origin.y += topLayoutOffset;
  safeArea.size.height -= topLayoutOffset + bottomLayoutOffset;
  CGRect localSafeArea = [vc.view convertRect:safeArea toView:self];
  UIEdgeInsets safeAreaInsets = UIEdgeInsetsMake(0, 0, 0, 0);
  if (CGRectGetMinY(localSafeArea) > CGRectGetMinY(self.bounds)) {
    safeAreaInsets.top = CGRectGetMinY(localSafeArea) - CGRectGetMinY(self.bounds);
  }
  if (CGRectGetMaxY(localSafeArea) < CGRectGetMaxY(self.bounds)) {
    safeAreaInsets.bottom = CGRectGetMaxY(self.bounds) - CGRectGetMaxY(localSafeArea);
  }

  return safeAreaInsets;
}

static BOOL UIEdgeInsetsEqualToEdgeInsetsWithThreshold(UIEdgeInsets insets1, UIEdgeInsets insets2, CGFloat threshold) {
  return
  ABS(insets1.left - insets2.left) <= threshold &&
  ABS(insets1.right - insets2.right) <= threshold &&
  ABS(insets1.top - insets2.top) <= threshold &&
  ABS(insets1.bottom - insets2.bottom) <= threshold;
}

- (void)safeAreaInsetsDidChange
{
  [self invalidateSafeAreaInsets];
}

- (void)invalidateSafeAreaInsets
{
  UIEdgeInsets safeAreaInsets = [self realOrEmulateSafeAreaInsets];
  self.onInsetsChange(@{
    @"top": @(safeAreaInsets.top),
  });
}

- (void)layoutSubviews
{
  [super layoutSubviews];

  if (!self.isSupportedByOS) {
    [self invalidateSafeAreaInsets];
  }
}

@end
