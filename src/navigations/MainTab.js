import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Image } from 'react-native'
import { ThemeContext } from 'styled-components/native'
import LogoImg from '../../assets/images/logo.png'
import MainPageImg from '../../assets/images/mainPage.png'
import BulletinBoardImg from '../../assets/images/bulletinBoard.png'
import FleaMarketImg from '../../assets/images/fleaMarket.png'
import JobSearchImg from '../../assets/images/jobSearch.png'
import MyInfoImg from '../../assets/images/myInfo.png'
import MainPageSelectedImg from '../../assets/images/mainPageSelected.png'
import BulletinBoardSelectedImg from '../../assets/images/bulletinBoardSelected.png'
import FleaMarketSelectedImg from '../../assets/images/fleaMarketSelected.png'
import JobSearchSelectedImg from '../../assets/images/jobSearchSelected.png'
import MyInfoSelectedImg from '../../assets/images/myInfoSelected.png'
import { MainPage, MyInfo } from '../screens'
import Board from '../screens/Board'

const Tab = createBottomTabNavigator()

export default function MainTab() {
  const theme = useContext(ThemeContext)
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
        unmountOnBlur: true,
      }}
    >
      <Tab.Screen
        name="MainPage"
        component={MainPage}
        options={{
          headerTitle: '메인 페이지',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? MainPageSelectedImg : MainPageImg}
              style={{
                width: 30,
                resizeMode: 'contain',
                marginRight: 11,
              }}
            ></Image>
          ),
        }}
      />
      <Tab.Screen
        name="BulletinBoard"
        component={Board}
        initialParams={{ articleType: 'BULLETIN' }}
        options={{
          headerTitle: '게시판',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? BulletinBoardSelectedImg : BulletinBoardImg}
              style={{
                width: 30,
                resizeMode: 'contain',
                marginRight: 11,
              }}
            ></Image>
          ),
        }}
      />
      <Tab.Screen
        name="FleaMarket"
        component={Board}
        initialParams={{ articleType: 'FLEA_MARKET' }}
        options={{
          headerTitle: '중고장터',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? FleaMarketSelectedImg : FleaMarketImg}
              style={{
                width: 30,
                resizeMode: 'contain',
                marginRight: 11,
              }}
            ></Image>
          ),
        }}
      />
      <Tab.Screen
        name="JobSearch"
        component={Board}
        initialParams={{ articleType: 'JOB_SEARCH' }}
        options={{
          headerTitle: '구인구직',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? JobSearchSelectedImg : JobSearchImg}
              style={{
                width: 30,
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
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? MyInfoSelectedImg : MyInfoImg}
              style={{
                width: 30,
                resizeMode: 'contain',
                marginRight: 11,
              }}
            ></Image>
          ),
        }}
      />
    </Tab.Navigator>
  )
}
