/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import {useState, useEffect} from 'react';
import DeprecatedUtils from './internal/deprecatedUtils';
import DeprecatedState from './internal/deprecatedState';
import * as DeprecatedTypes from './internal/deprecatedTypes';
import State from './internal/state';
import * as Types from './internal/types';

// Call the setup methods of the two state modules right away
State.setup();
DeprecatedState.setup();

const _isConnectedListeners = new Map<
  DeprecatedTypes.IsConnectedHandler,
  /// @ts-ignore Typescript des not like the trailing comma that Prettier insists upon
  Types.NetInfoChangeHandler
>();

/**
 * Returns a `Promise` that resolves to a `NetInfoState` object.
 *
 * @returns A Promise which contains the current connection state.
 */
export function fetch(): Promise<Types.NetInfoState> {
  return State.latest();
}

/**
 * Subscribe to connection information. The callback is called with a parameter of type
 * [`NetInfoState`](README.md#netinfostate) whenever the connection state changes. Your listener
 * will be called with the latest information soon after you subscribe and then with any
 * subsequent changes afterwards. You should not assume that the listener is called in the same
 * way across devices or platforms.
 *
 * @param listener The listener which is called when the network state changes.
 *
 * @returns An ofunction which can be called to unsubscribe.
 */
export function addEventListener(
  listener: Types.NetInfoChangeHandler,
): Types.NetInfoSubscription;

/**
 * Deprecated network state listener. You should remove the event name and change your handler to
 * use the new state shape.
 *
 * @deprecated
 *
 * @param type The event type.
 * @param deprecatedHandler The listener.
 *
 * @returns An object with a remove function which can be called to unsubscribe.
 */
export function addEventListener(
  type: string,
  deprecatedHandler: DeprecatedTypes.ChangeHandler,
): DeprecatedTypes.Subscription;

// Implementation of the overloaded methods above
export function addEventListener(
  listenerOrType: Types.NetInfoChangeHandler | string,
  deprecatedHandler: DeprecatedTypes.ChangeHandler | undefined = undefined,
): Types.NetInfoSubscription | DeprecatedTypes.Subscription {
  if (typeof listenerOrType === 'string') {
    DeprecatedUtils.warnOnce();

    if (
      listenerOrType === DeprecatedTypes.CHANGE_EVENT_NAME &&
      deprecatedHandler
    ) {
      DeprecatedState.add(deprecatedHandler);
      return {
        remove: (): void => {
          DeprecatedState.remove(deprecatedHandler);
        },
      };
    } else {
      return {
        remove: (): void => {},
      };
    }
  } else {
    const listener = listenerOrType;
    State.add(listener);
    return (): void => {
      State.remove(listener);
    };
  }
}

/**
 * A React Hook which updates when the connection state changes.
 *
 * @returns The connection state.
 */
export function useNetInfo(): Types.NetInfoState {
  const [netInfo, setNetInfo] = useState<Types.NetInfoState>({
    type: Types.NetInfoStateType.unknown,
    isConnected: false,
    isInternetReachable: false,
    details: null,
  });

  useEffect((): (() => void) => {
    return addEventListener(setNetInfo);
  }, []);

  return netInfo;
}

/**
 * Deprecated method to remove the listener. You should upgrade to the new API.
 *
 * @deprecated
 *
 * @param type The event type.
 * @param handler The event listener.
 */
export function removeEventListener(
  type: string,
  handler: DeprecatedTypes.ChangeHandler,
): void {
  DeprecatedUtils.warnOnce();

  if (type === DeprecatedTypes.CHANGE_EVENT_NAME) {
    DeprecatedState.remove(handler);
  }
}

/**
 * Deprecated method to get the current state. You should upgrade to the new `fetch` method and
 * handle the new state type.
 *
 * @deprecated
 */
export function getConnectionInfo(): Promise<DeprecatedTypes.NetInfoData> {
  DeprecatedUtils.warnOnce();
  return DeprecatedState.latest();
}

/**
 * Deprecated method to tell if the current connection is "expensive". Only available on Android.
 * You should now call the `fetch` method and look at the `details.isConnectionExpensive` property.
 *
 * @deprecated
 */
export function isConnectionExpensive(): Promise<boolean> {
  DeprecatedUtils.warnOnce();
  return State.latest().then(DeprecatedUtils.isConnectionExpensive);
}

export const isConnected = {
  /**
   * Deprecated method to listen for changes to the connected boolean. You should now use the
   * normal `addEventListener` method and look at the `isConnected` property.
   *
   * @deprecated
   */
  addEventListener: (
    eventName: string,
    handler: DeprecatedTypes.IsConnectedHandler,
  ): DeprecatedTypes.Subscription => {
    if (eventName !== DeprecatedTypes.CHANGE_EVENT_NAME) {
      return {remove: (): void => {}};
    }

    const listener = (state: Types.NetInfoState): void => {
      handler(DeprecatedUtils.isConnected(state));
    };

    _isConnectedListeners.set(handler, listener);
    State.add(listener);

    return {
      remove: (): void => {
        State.remove(listener);
      },
    };
  },

  /**
   * Deprecated method to stop listening for changes to the connected boolean. You should now use
   * the normal `addEventListener` method and look at the `isConnected` property.
   *
   * @deprecated
   */
  removeEventListener: (
    _eventName: string,
    handler: DeprecatedTypes.IsConnectedHandler,
  ): void => {
    const listener = _isConnectedListeners.get(handler);
    listener && State.remove(listener);
    _isConnectedListeners.delete(handler);
  },

  /**
   * Deprecated method to get the current is connected boolean. You should now use the normal
   * `fetch` method and look at the `isConnected` property.
   *
   * @deprecated
   */
  fetch: (): Promise<boolean> => {
    return State.latest().then(DeprecatedUtils.isConnected);
  },
};

export * from './internal/types';
export * from './internal/deprecatedTypes';

export default {
  fetch,
  addEventListener,
  useNetInfo,
  removeEventListener,
  getConnectionInfo,
  isConnectionExpensive,
  isConnected,
};
