import type { Metrics } from '../SafeArea.types';

export interface Spec {
  getConstants(): {
    initialWindowMetrics: Metrics | null | undefined;
  };
}

const module: Spec | null | undefined;

export default module;
