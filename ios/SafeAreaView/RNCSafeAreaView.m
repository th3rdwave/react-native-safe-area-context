// Simplified version of https://github.com/facebook/react-native/blob/master/React/Views/SafeAreaView/RCTSafeAreaView.m

#import "RNCSafeAreaView.h"

#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>

@implementation RNCSafeAreaView

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

- (void)safeAreaInsetsDidChange
{
  [self invalidateSafeAreaInsets];
}

- (void)invalidateSafeAreaInsets
{
  UIEdgeInsets safeAreaInsets = [self realOrEmulateSafeAreaInsets];
  self.onInsetsChange(@{
    @"insets": @{
      @"top": @(safeAreaInsets.top),
      @"right": @(safeAreaInsets.right),
      @"bottom": @(safeAreaInsets.bottom),
      @"left": @(safeAreaInsets.left),
    }
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
