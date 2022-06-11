import React, { useContext } from 'react';
import { Image } from 'react-native';
import { ThemeContext } from 'styled-components';
import { createStackNavigator } from '@react-navigation/stack';
import Logo from '../../assets/images/logo.png';
import { Login, Signup, FindInfo, ResetPw } from '../screens';

const Stack = createStackNavigator();

const AuthStack = () => {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
      initialRouteName="Login"
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
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerTitle: '회원가입' }}
      />
      <Stack.Screen
        name="FindInfo"
        component={FindInfo}
        options={{ headerTitle: '전화번호 인증' }}
      />
      <Stack.Screen
        name="ResetPw"
        component={ResetPw}
        options={{ headerTitle: '비밀번호 재설정' }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
