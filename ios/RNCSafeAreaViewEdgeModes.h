#import <Foundation/Foundation.h>

typedef NS_ENUM(NSInteger, RNCSafeAreaViewEdgeModes) {
    RNCSafeAreaViewEdgeModesAdditive = 0b1000,
    RNCSafeAreaViewEdgeModesMaximum = 0b0100,
    RNCSafeAreaViewEdgeModesOff = 0b0000
};

@interface NSString (EnumParser)
- (RNCSafeAreaViewEdgeModes)RNCSafeAreaViewEdgeModesFromString;
@end
