import {RouteNames} from '@navigation/routesNames';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@root/src/types/navigation';
import React from 'react';
import HomeTestView from './components/HomeTestView';

export interface HomeTestProps
  extends NativeStackScreenProps<
    RootStackParamList,
    RouteNames.HomeTestScreen
  > {}

export default function HomeTest(props: HomeTestProps) {
  return <HomeTestView {...props} />;
}
