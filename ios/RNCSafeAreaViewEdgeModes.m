#import "RNCSafeAreaViewEdgeModes.h"
#import <React/RCTConvert.h>

@implementation RCTConvert (RNCSafeAreaView)

RCT_MULTI_ENUM_CONVERTER(
    RNCSafeAreaViewEdgeModes,
    (@{
      @"off" : @(RNCSafeAreaViewEdgeModesOff),
      @"additive" : @(RNCSafeAreaViewEdgeModesAdditive),
      @"maximum" : @(RNCSafeAreaViewEdgeModesMaximum),
    }),
    RNCSafeAreaViewEdgeModesOff,
    integerValue);

@end

@implementation NSString (EnumParser)

- (RNCSafeAreaViewEdgeModes)RNCSafeAreaViewEdgeModesFromString{
    NSDictionary<NSString*,NSNumber*> *edgeModes = @{
                            @"off": @(RNCSafeAreaViewEdgeModesOff),
                            @"additive": @(RNCSafeAreaViewEdgeModesAdditive),
                            @"maximum": @(RNCSafeAreaViewEdgeModesMaximum),
                            };
    return edgeModes[self].integerValue;
}

@end
