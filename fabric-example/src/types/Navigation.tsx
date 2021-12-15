import type { StackScreenProps } from '@react-navigation/stack';

export type Routes = {
  Home: undefined;
  Details: undefined;
  ModalDetails: undefined;
  Settings: undefined;
};

export type ScreenProps<T extends keyof Routes> = StackScreenProps<Routes, T>;
