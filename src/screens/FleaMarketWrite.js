import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import styled from 'styled-components/native'
import BasicTextInput from '../components/BasicTextInput'
import BasicButton from '../components/BasicButton'
import { Alert, Text } from 'react-native'
import { createArticle } from '../utils/firebase'
import { UserContext } from '../contexts'

const MainContainer = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding-top: 50px;
  height: 100%;
`

const Container = styled.View`
  width: 80%;
`

const BlankContainer = styled.View`
  height: 10%;
`

const BlankContainerTitle = styled.View`
  height: 5%;
`

const BlankContainerPrice = styled.View`
  height: 2%;
`

export default function FleaMarketWrite({ navigation, route }) {
  const { user } = useContext(UserContext)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [price, setPrice] = useState('')
  const [place, setPlace] = useState('')

  const { articleType } = route.params

  const onClickSubmit = async () => {
    const _title = title.trim()
    const _content = content.trim()
    const _price = price.trim()
    const_place = place.trim()

    if (_title.length < 1) {
      Alert.alert('게시글 작성', '제목을 입력해주세요')
      return
    }
    if (_content.length < 1) {
      Alert.alert('게시글 작성', '내용을 입력해주세요')
      return
    }
    if (_price.length <1) {
      Alert.alert('게시글 작성', '가격을 입력해주세요')
    }
    if (_place.length <1) {
      Alert.alert('게시글 작성', '거래 장소를 입력해주세요')
    }
    await createArticle({
      title: _title,
      content: _content,
      type: articleType,
      userId: user.id,
    })
    // switch (articleType) {
    //   case 'BULLETIN':
    //     navigation.navigate('BulletinBoard')
    //     return
    //   case 'FLEA_MARKET':
    //     navigation.navigate('FleaMarket')
    //     return
    //   case 'JOB_SEARCH':
    //     navigation.navigate('JobSearch')
    //     return
    // }
  }
  return (
    <MainContainer>
      <Container>
        <BasicTextInput
          onChangeText={setTitle}
          placeholder="제목"
          fontSize="20px"
          width="100%"
          smargin="0 0 5px 0"
          value={title}
        />
        <BlankContainerTitle />
        <BasicTextInput
          onChangeText={setContent}
          placeholder="내용"
          fontSize="20px"
          smargin="0 0 5px 0"
          value={content}
          height="50%"
          multiline={true}
        />
        <BlankContainerPrice/>
        <BasicTextInput
          onChangeText={setPrice}
          placeholder="가격"
          fontSize="20px"
          width="100%"
          smargin="0 0 5px 0"
          value={price}
        />
        <BlankContainerPrice/>
        <BasicTextInput
          onChangeText={setPlace}
          placeholder="위치"
          fontSize="20px"
          width="100%"
          smargin="0 0 5px 0"
          value={place}
        />
        <BlankContainer />
        <BasicButton
          title="작성하기"
          onPress={onClickSubmit}
          fontSize="30px"
          width="100%"
          smargin="0 0 5px 0"
          isFilled
        />
      </Container>
    </MainContainer>
  )
}
