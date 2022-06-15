import React, { useEffect, useState } from 'react'
import BasicTextInput from '../components/BasicTextInput'
import { Alert, View } from 'react-native'
import { createFleaMarketArticleInfo } from '../utils/firebase'
import ArticleWrite from './ArticleWrite'

export default function FleaMarketWrite({ navigation, route }) {
  const [price, setPrice] = useState('')
  const [place, setPlace] = useState('')

  useEffect(() => {
    if (!/^[0-9]+$/.test(price)) {
      if (price.length == 1) setPrice('')
      else setPrice((p) => p.substring(0, p.length - 1))
    }
  }, [price])

  const beforeSubmit = () => {
    const _price = price.trim()
    const _place = place.trim()
    if (_price.length < 1) {
      Alert.alert('게시글 작성', '가격을 입력해주세요')
      return false
    }
    if (_place.length < 1) {
      Alert.alert('게시글 작성', '장소를 입력해주세요')
      return false
    }
    return true
  }

  const onSubmit = async (articleId) => {
    await createFleaMarketArticleInfo({
      place: place.trim(),
      price: Number.parseInt(price.trim()),
      articleId,
    })
  }
  return (
    <ArticleWrite
      navigation={navigation}
      route={route}
      beforeSubmit={beforeSubmit}
      onSubmit={onSubmit}
      Inputs={
        <View>
          <BasicTextInput
            onChangeText={setPrice}
            placeholder="가격"
            fontSize="20px"
            width="100%"
            smargin="0 0 5px 0"
            value={price}
          />
          <BasicTextInput
            onChangeText={setPlace}
            placeholder="위치"
            fontSize="20px"
            width="100%"
            smargin="0 0 10px 0"
            value={place}
          />
        </View>
      }
    />
  )
}
