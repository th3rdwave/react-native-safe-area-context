import * as React from 'react';
import { ViewStyle, View } from 'react-native';

import { InsetChangeNativeCallback } from './SafeArea.types';

interface NativeSafeAreaViewProps {
  children?: React.ReactNode;
  style: ViewStyle;
  onInsetsChange: InsetChangeNativeCallback;
}

enum CSSTransitions {
  WebkitTransition = 'webkitTransitionEnd',
  Transition = 'transitionEnd',
  MozTransition = 'transitionend',
  MSTransition = 'msTransitionEnd',
  OTransition = 'oTransitionEnd',
}

export default function NativeSafeAreaView({
  children,
  style,
  onInsetsChange,
}: NativeSafeAreaViewProps) {
  React.useEffect(() => {
    const element = createContextElement();
    document.body.appendChild(element);
    const onEnd = () => {
      const {
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
      } = window.getComputedStyle(element);

      const insets = {
        top: paddingTop ? parseInt(paddingTop, 10) : 0,
        bottom: paddingBottom ? parseInt(paddingBottom, 10) : 0,
        left: paddingLeft ? parseInt(paddingLeft, 10) : 0,
        right: paddingRight ? parseInt(paddingRight, 10) : 0,
      };
      // @ts-ignore: missing properties
      onInsetsChange({ nativeEvent: { insets } });
    };
    element.addEventListener(SUPPORTED_TRANSITION_EVENT, onEnd);
    onEnd();
    return () => {
      document.body.removeChild(element);
      element.removeEventListener(SUPPORTED_TRANSITION_EVENT, onEnd);
    };
  }, [onInsetsChange]);

  return <View style={style}>{children}</View>;
}

const SUPPORTED_TRANSITION_EVENT: string = (() => {
  const element = document.createElement('invalidtype');

  for (const key in CSSTransitions) {
    if (element.style[key] !== undefined) {
      return CSSTransitions[key];
    }
  }
  return CSSTransitions.Transition;
})();

const SUPPORTED_ENV: 'constant' | 'env' = (() => {
  // @ts-ignore: Property 'CSS' does not exist on type 'Window'.ts(2339)
  const { CSS } = window;
  if (
    CSS &&
    CSS.supports &&
    CSS.supports('top: constant(safe-area-inset-top)')
  ) {
    return 'constant';
  }
  return 'env';
})();

function getInset(side: string): string {
  return `${SUPPORTED_ENV}(safe-area-inset-${side})`;
}

function createContextElement(): HTMLElement {
  const element = document.createElement('div');
  const { style } = element;
  style.position = 'fixed';
  style.left = '0';
  style.top = '0';
  style.width = '0';
  style.height = '0';
  style.zIndex = '-1';
  style.overflow = 'hidden';
  style.visibility = 'hidden';
  // Bacon: Anything faster than this and the callback will be invoked too early with the wrong insets
  style.transitionDuration = '0.05s';
  style.transitionProperty = 'padding';
  style.transitionDelay = '0s';
  style.paddingTop = getInset('top');
  style.paddingBottom = getInset('bottom');
  style.paddingLeft = getInset('left');
  style.paddingRight = getInset('right');
  return element;
}
