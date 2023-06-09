#import <Foundation/Foundation.h>

typedef NS_ENUM(NSInteger, RNCSafeAreaViewEdgeMode) {
  RNCSafeAreaViewEdgeModeOff,
  RNCSafeAreaViewEdgeModeAdditive,
  RNCSafeAreaViewEdgeModeMaximum
};

@interface NSString (EnumParser)
- (RNCSafeAreaViewEdgeMode)RNCSafeAreaViewEdgeModeFromString;
@end
