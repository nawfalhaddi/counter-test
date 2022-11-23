import {RouteNames} from '@navigation/routesNames';
import {useIsFocused} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@root/src/types/navigation';
import {useCreatePost} from '@screens/Home/hooks/useCreatePost';
import {useGetPosts} from '@screens/Home/hooks/useGetPosts';
import {useDispatch, useSelector} from '@store';
import {decrement, increment} from '@store/counterSlice';
import {horizontalScale, verticalScale} from '@ui/theme/scaling';
import {styled} from '@ui/theme/styled-components';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const isPrime = (num: number) => {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return num > 1;
};

export interface HomeViewProps
  extends NativeStackScreenProps<RootStackParamList, RouteNames.HomeScreen> {}

const triggerAlert = (title: string, message: string) => {
  Alert.alert(title, message, [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);
};

export default function HomeView({navigation}: HomeViewProps) {
  const {value} = useSelector(state => state.counter);
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();
  const postsQuery = useGetPosts({
    /*always use the option enabled with 'useIsFocused'
     * as react navigation keeps stacks mounted in the background
     * and react query doesn't detect that the screen was revisited
     */

    enabled: useIsFocused(),
  });
  const createPostMutation = useCreatePost();

  return (
    <Root contentContainerStyle={styles.contentContainerStyle}>
      <Title>Redux example</Title>

      <Container>
        <CustomButton
          onPress={() => {
            dispatch(decrement());
          }}
        >
          <Text style={{color: 'white', fontSize: 40, textAlign: 'center'}}>
            -
          </Text>
        </CustomButton>

        <Description> {value}</Description>

        <CustomButton
          onPress={() => {
            dispatch(increment());
          }}
        >
          <Text style={{color: 'white', fontSize: 40, textAlign: 'center'}}>
            +
          </Text>
        </CustomButton>
      </Container>

      <Container>
        <Description>
          {`${value} ${isPrime(value) ? 'is prime' : 'is not prime'}`}
        </Description>
      </Container>
    </Root>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: verticalScale(100),
    paddingHorizontal: horizontalScale(10),
  },
});

const Root = styled(ScrollView)(({theme: {spacingValues, colors}}) => ({
  flex: 1,
  backgroundColor: colors.orange200,
}));

const CustomButton = styled(TouchableOpacity)(
  ({theme: {spacingValues, colors}}) => ({
    marginBottom: spacingValues.v2xl,
    height: 50,
    width: 50,
    backgroundColor: 'blue',
  }),
);
const Container = styled(View)(({theme: {spacingValues, colors}}) => ({
  flexDirection: 'row',
  alignItems: 'center',
  width: '80%',
  justifyContent: 'space-between',
}));

const Title = styled(Text)(({theme: {spacingValues, textType}}) => ({
  ...textType.BodyLgBold,
  textAlign: 'left',
}));

const Description = styled(Text)(({theme: {spacingValues, textType}}) => ({
  marginBottom: spacingValues.vMd,
  fontSize: 30,
  textAlign: 'center',
  width: '70%',
}));

const Separator = styled(View)(({theme: {spacingValues, colors}}) => ({
  height: spacingValues.vLg,
  width: '100%',
  background: colors.orange900,
  borderWidth: verticalScale(1),
  marginVertical: spacingValues.vLg,
}));
