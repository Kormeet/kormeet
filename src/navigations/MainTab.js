import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import Logo from '../../assets/images/logo.png';
import {
  MainPage,
  BulletinBoard,
  FleaMarket,
  JobSearch,
  MyInfo,
} from '../screens';

const Tab = createBottomTabNavigator();

export default function MainTab() {
  const theme = useContext(ThemeContext);
  return (
    <Tab.Navigator
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
      <Tab.Screen
        name="MainPage"
        component={MainPage}
        options={{ headerTitle: '메인 페이지' }}
      />
      <Tab.Screen
        name="BulletinBoard"
        component={BulletinBoard}
        options={{ headerTitle: '게시판' }}
      />
      <Tab.Screen
        name="FleaMarket"
        component={FleaMarket}
        options={{ headerTitle: '중고장터' }}
      />
      <Tab.Screen
        name="JobSearch"
        component={JobSearch}
        options={{ headerTitle: '구인구직' }}
      />
      <Tab.Screen
        name="MyInfo"
        component={MyInfo}
        options={{ headerTitle: '내 정보' }}
      />
    </Tab.Navigator>
  );
}
