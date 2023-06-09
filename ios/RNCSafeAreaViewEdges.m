#import <React/RCTConvert.h>
#import "RNCSafeAreaViewEdges.h"

RNCSafeAreaViewEdges RNCSafeAreaViewEdgesMake(RNCSafeAreaViewEdgeMode top, RNCSafeAreaViewEdgeMode right, RNCSafeAreaViewEdgeMode bottom, RNCSafeAreaViewEdgeMode left)
{
    RNCSafeAreaViewEdges edges;
    edges.top = top;
    edges.left = left;
    edges.bottom = bottom;
    edges.right = right;
    return edges;
}

RNCSafeAreaViewEdges RNCSafeAreaViewEdgesMakeString(NSString *top, NSString *right, NSString *bottom, NSString *left)
{
    RNCSafeAreaViewEdges edges;
    edges.top = [top RNCSafeAreaViewEdgeModeFromString];
    edges.right = [right RNCSafeAreaViewEdgeModeFromString];
    edges.bottom = [bottom RNCSafeAreaViewEdgeModeFromString];
    edges.left = [left RNCSafeAreaViewEdgeModeFromString];
    return edges;
}

@implementation RCTConvert (RNCSafeAreaViewEdges)

RCT_CUSTOM_CONVERTER(RNCSafeAreaViewEdges, RNCSafeAreaViewEdges, RNCSafeAreaViewEdgesMakeString(json[@"top"], json[@"right"], json[@"bottom"], json[@"left"]))

@end
