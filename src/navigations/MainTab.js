import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import LogoImg from '../../assets/images/logo.png';
import MainPageImg from '../../assets/images/mainPage.png';
import BulletinBoardImg from '../../assets/images/bulletinBoard.png';
import FleaMarketImg from '../../assets/images/fleaMarket.png';
import JobSearchImg from '../../assets/images/jobSearch.png';
import MyInfoImg from '../../assets/images/myInfo.png';
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
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        headerRight: () => (
          <Image
            source={LogoImg}
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
        options={{
          headerTitle: '메인 페이지',
          tabBarIcon: () => (
            <Image
              source={MainPageImg}
              style={{
                width: 40,
                resizeMode: 'contain',
                marginRight: 11,
              }}
            ></Image>
          ),
        }}
      />
      <Tab.Screen
        name="BulletinBoard"
        component={BulletinBoard}
        options={{
          headerTitle: '게시판',
          unmountOnBlur: true,
          tabBarIcon: () => (
            <Image
              source={BulletinBoardImg}
              style={{
                width: 40,
                resizeMode: 'contain',
                marginRight: 11,
              }}
            ></Image>
          ),
        }}
      />
      <Tab.Screen
        name="FleaMarket"
        component={FleaMarket}
        options={{
          headerTitle: '중고장터',
          tabBarIcon: () => (
            <Image
              source={FleaMarketImg}
              style={{
                width: 40,
                resizeMode: 'contain',
                marginRight: 11,
              }}
            ></Image>
          ),
        }}
      />
      <Tab.Screen
        name="JobSearch"
        component={JobSearch}
        options={{
          headerTitle: '구인구직',
          tabBarIcon: () => (
            <Image
              source={JobSearchImg}
              style={{
                width: 40,
                resizeMode: 'contain',
                marginRight: 11,
              }}
            ></Image>
          ),
        }}
      />
      <Tab.Screen
        name="MyInfo"
        component={MyInfo}
        options={{
          headerTitle: '내 정보',
          tabBarIcon: () => (
            <Image
              source={MyInfoImg}
              style={{
                width: 40,
                resizeMode: 'contain',
                marginRight: 11,
              }}
            ></Image>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
