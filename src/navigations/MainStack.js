import { createStackNavigator } from '@react-navigation/stack'
import React, { useContext } from 'react'
import { Image } from 'react-native'
import { ThemeContext } from 'styled-components'
import MainTab from './MainTab'
import Logo from '../../assets/images/logo.png'
import { ConfirmPw, ChangeInfo, ArticleWrite } from '../screens'
import ArticleScreen from '../screens/ArticleScreen'
import FleaMarketWrite from '../screens/FleaMarketWrite'

const Stack = createStackNavigator()

export default function MainStack() {
  const theme = useContext(ThemeContext)
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
        component={ArticleScreen}
        options={{ headerTitle: '자유게시판 게시글' }}
      />
      <Stack.Screen
        name="FleaMarketArticle"
        component={ArticleScreen}
        options={{ headerTitle: '중고장터 게시글' }}
      />
      <Stack.Screen
        name="JobSearchArticle"
        component={ArticleScreen}
        options={{ headerTitle: '구인구직 게시글' }}
      />
      <Stack.Screen
        name="BulletinBoardWrite"
        component={ArticleWrite}
        options={{ headerTitle: '게시글 작성' }}
      />
      <Stack.Screen
        name="FleaMarketWrite"
        component={FleaMarketWrite}
        options={{ headerTitle: '판매글 작성' }}
      />
      <Stack.Screen
        name="JobSearchWrite"
        component={ArticleWrite}
        options={{ headerTitle: '구인글 작성' }}
      />
    </Stack.Navigator>
  )
}
