#import <Foundation/Foundation.h>
#import "RNCSafeAreaViewEdgeModes.h"

typedef struct RNCSafeAreaViewEdges {
    RNCSafeAreaViewEdgeModes top;
    RNCSafeAreaViewEdgeModes right;
    RNCSafeAreaViewEdgeModes bottom;
    RNCSafeAreaViewEdgeModes left;
} RNCSafeAreaViewEdges;

RNCSafeAreaViewEdges RNCSafeAreaViewEdgesMake(RNCSafeAreaViewEdgeModes top, RNCSafeAreaViewEdgeModes right, RNCSafeAreaViewEdgeModes bottom, RNCSafeAreaViewEdgeModes left);
