#import "RNCSafeAreaViewLocalData.h"

@implementation RNCSafeAreaViewLocalData

- (instancetype)initWithInsets:(UIEdgeInsets)insets mode:(RNCSafeAreaViewMode)mode edges:(RNCSafeAreaViewEdges)edges minPadding:(UIEdgeInsets)minPadding
{
  if (self = [super init]) {
    _insets = insets;
    _mode = mode;
    _edges = edges;
    _minPadding = minPadding;
  }

  return self;
}

@end
