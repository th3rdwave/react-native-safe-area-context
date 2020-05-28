#import "RNCSafeAreaView.h"

#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>

#import "RNCSafeAreaViewLocalData.h"
#import "RNCSafeAreaViewMode.h"
#import "RNCSafeAreaViewEdges.h"
#import "RCTView+SafeAreaCompat.h"

@implementation RNCSafeAreaView {
  __weak RCTBridge *_bridge;
  UIEdgeInsets _currentSafeAreaInsets;
  RNCSafeAreaViewMode _mode;
  RNCSafeAreaViewEdges _edges;
}

- (instancetype)initWithBridge:(RCTBridge *)bridge
{
  if (self = [super initWithFrame:CGRectZero]) {
    _bridge = bridge;
    // Defaults
    _emulateUnlessSupported = YES;
    _mode = RNCSafeAreaViewModePadding;
    _edges = RNCSafeAreaViewEdgesAll;
  }

  return self;
}

RCT_NOT_IMPLEMENTED(-(instancetype)initWithCoder : (NSCoder *)decoder)
RCT_NOT_IMPLEMENTED(-(instancetype)initWithFrame : (CGRect)frame)

- (NSString *)description
{
  NSString *superDescription = [super description];

  // Cutting the last `>` character.
  if (superDescription.length > 0 && [superDescription characterAtIndex:superDescription.length - 1] == '>') {
    superDescription = [superDescription substringToIndex:superDescription.length - 1];
  }

  return [NSString stringWithFormat:@"%@; RNCSafeAreaInsets = %@; appliedRNCSafeAreaInsets = %@>",
          superDescription,
          NSStringFromUIEdgeInsets([self.reactViewController.view safeAreaInsetsOrEmulate:self.emulateUnlessSupported]),
          NSStringFromUIEdgeInsets(_currentSafeAreaInsets)];
}

- (void)safeAreaInsetsDidChange
{
  [super safeAreaInsetsDidChange];
  [self invalidateSafeAreaInsets];
}

- (void)layoutSubviews
{
  [super layoutSubviews];

  if (!self.nativeSafeAreaSupport && self.emulateUnlessSupported) {
    [self invalidateSafeAreaInsets];
  }
}

- (void)invalidateSafeAreaInsets
{
  UIEdgeInsets safeAreaInsets = [self.reactViewController.view safeAreaInsetsOrEmulate:self.emulateUnlessSupported];

  if (UIEdgeInsetsEqualToEdgeInsetsWithThreshold(safeAreaInsets, _currentSafeAreaInsets, 1.0 / RCTScreenScale())) {
    return;
  }

  _currentSafeAreaInsets = safeAreaInsets;
  [self updateLocalData];
}

- (void)updateLocalData
{
  RNCSafeAreaViewLocalData *localData = [[RNCSafeAreaViewLocalData alloc] initWithInsets:_currentSafeAreaInsets
                                                                                    mode:_mode
                                                                                   edges:_edges];
  [_bridge.uiManager setLocalData:localData forView:self];
}

- (void)setEmulateUnlessSupported:(BOOL)emulateUnlessSupported
{
  if (_emulateUnlessSupported == emulateUnlessSupported) {
    return;
  }

  _emulateUnlessSupported = emulateUnlessSupported;

  if ([self nativeSafeAreaSupport]) {
    return;
  }

  [self invalidateSafeAreaInsets];
}

- (void)setMode:(RNCSafeAreaViewMode)mode {
    _mode = mode;
    [self updateLocalData];
}

- (void)setEdges:(RNCSafeAreaViewEdges)edges {
  _edges = edges;
  [self updateLocalData];
}

@end
