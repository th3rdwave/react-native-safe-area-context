#import <React/RCTConvert.h>
#import "RNCSafeAreaViewEdges.h"

RNCSafeAreaViewEdges RNCSafeAreaViewEdgesMake(RNCSafeAreaViewEdgeModes top, RNCSafeAreaViewEdgeModes right, RNCSafeAreaViewEdgeModes bottom, RNCSafeAreaViewEdgeModes left)
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
    edges.top = [top RNCSafeAreaViewEdgeModesFromString];
    edges.right = [right RNCSafeAreaViewEdgeModesFromString];
    edges.bottom = [bottom RNCSafeAreaViewEdgeModesFromString];
    edges.left = [left RNCSafeAreaViewEdgeModesFromString];
    return edges;
}

@implementation RCTConvert (RNCSafeAreaViewEdges)

RCT_CUSTOM_CONVERTER(RNCSafeAreaViewEdges, RNCSafeAreaViewEdges, RNCSafeAreaViewEdgesMakeString(json[@"top"], json[@"right"], json[@"bottom"], json[@"left"]))

@end
