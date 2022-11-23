import {RouteNames} from '@navigation/routesNames';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@root/src/types/navigation';
import {styled} from '@ui/theme/styled-components';
import React from 'react';
import {Text, View} from 'react-native';

export interface HomeTestViewProps
  extends NativeStackScreenProps<
    RootStackParamList,
    RouteNames.HomeTestScreen
  > {}

export default function HomeTestView({navigation}: HomeTestViewProps) {
  return (
    <MainContainer>
      <Text>Home View</Text>
    </MainContainer>
  );
}
const MainContainer = styled(View)(
  ({theme: {colors, textType, spacingValues}}) => ({
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacingValues.vLg,
    paddingHorizontal: spacingValues.hLg,
  }),
);
