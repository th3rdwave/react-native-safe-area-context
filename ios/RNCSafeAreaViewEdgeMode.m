#import "RNCSafeAreaViewEdgeMode.h"
#import <React/RCTConvert.h>

@implementation RCTConvert (RNCSafeAreaViewEdgeMode)

RCT_ENUM_CONVERTER(
    RNCSafeAreaViewEdgeMode,
    (@{
      @"off" : @(RNCSafeAreaViewEdgeModeOff),
      @"additive" : @(RNCSafeAreaViewEdgeModeAdditive),
      @"maximum" : @(RNCSafeAreaViewEdgeModeMaximum),
    }),
    RNCSafeAreaViewEdgeModeOff,
    integerValue);

@end

@implementation NSString (EnumParser)

- (RNCSafeAreaViewEdgeMode)RNCSafeAreaViewEdgeModeFromString{
    NSDictionary<NSString*,NSNumber*> *edgeModes = @{
                            @"off": @(RNCSafeAreaViewEdgeModeOff),
                            @"additive": @(RNCSafeAreaViewEdgeModeAdditive),
                            @"maximum": @(RNCSafeAreaViewEdgeModeMaximum),
                            };
    return edgeModes[self].integerValue;
}

@end
