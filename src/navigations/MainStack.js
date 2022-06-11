import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { Image } from 'react-native';
import { ThemeContext } from 'styled-components';
import MainTab from './MainTab';
import Logo from '../../assets/images/logo.png';
import { ConfirmPw, ChangeInfo, BulletinBoardArticle } from '../screens';

const Stack = createStackNavigator();

export default function MainStack() {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerTitleAlign: 'center',
        cardStyle: { backgroundColor: theme.backgroundColor },
        headerRight: () => (
          <Image
            source={Logo}
            style={{
              width: 70,
              resizeMode: 'contain',
              marginRight: 11,
            }}
          />
        ),
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Main"
        component={MainTab}
      />
      <Stack.Screen
        name="ConfirmPw"
        component={ConfirmPw}
        options={{ headerTitle: '비밀번호 확인' }}
      />
      <Stack.Screen
        name="ChangeInfo"
        component={ChangeInfo}
        options={{ headerTitle: '개인정보 변경' }}
      />
      <Stack.Screen
        name="BulletinBoardArticle"
        component={BulletinBoardArticle}
        options={{ headerTitle: '자유게시판 게시글' }}
      />
    </Stack.Navigator>
  );
}
