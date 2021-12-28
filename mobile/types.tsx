/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  TourForm: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Home: undefined;
  Tour: {
    TourHome: {
      tourId: string;
    };
    TourLocation: {
      tourLocationId: string;
    };
  };
};

export type ScreenStackParamList = {
  Tour: NavigatorScreenParams<ScreenParamList> | undefined;
};

export type ScreenParamList = {
  ToursHome: undefined;
  TourHome: {
    tourId: string;
    tourName: string;
  };
  TourLocation: {
    tourLocationId: string;
    tourLocationName: string;
  };
  TourFormScreen: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type TourScreenProps<Screen extends keyof ScreenParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ScreenParamList, Screen>,
    NativeStackScreenProps<ScreenStackParamList>
  >;
