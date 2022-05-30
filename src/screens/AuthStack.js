import React, { useContext } from 'react';
import { Image } from 'react-native';
import { ThemeContext } from 'styled-components';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Signup, FindInfo, ResetPw } from '../screens';
import Logo from '../../assets/images/logo.png';

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
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="FindInfo" component={FindInfo} />
      <Stack.Screen name="ResetPw" component={ResetPw} />
    </Stack.Navigator>
  );
};

export default AuthStack;
