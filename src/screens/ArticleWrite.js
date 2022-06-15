import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import styled from 'styled-components/native'
import BasicTextInput from '../components/BasicTextInput'
import BasicButton from '../components/BasicButton'
import { Alert, Text, View } from 'react-native'
import { createArticle } from '../utils/firebase'
import { UserContext } from '../contexts'

const MainContainer = styled.View`
  background-color: ${({ theme }) => theme.background};
  padding-top: 50px;
  height: 100%;
`

const Container = styled.ScrollView`
  height: 100%;
  margin: 0 auto;
  width: 80%;
`

const BlankContainer = styled.View`
  height: 15%;
`

const BlankContainerTitle = styled.View`
  height: 5%;
`

export default function ArticleWrite({ navigation, route, children }) {
  const { user } = useContext(UserContext)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [contentHeight, setContentHeight] = useState(0)

  const { articleType } = route.params

  const onClickSubmit = async () => {
    const _title = title.trim()
    const _content = content.trim()
    if (_title.length < 1) {
      Alert.alert('게시글 작성', '제목을 입력해주세요')
      return
    }
    if (_content.length < 1) {
      Alert.alert('게시글 작성', '내용을 입력해주세요')
      return
    }
    await createArticle({
      title: _title,
      content: _content,
      type: articleType,
      userId: user.id,
    })
    navigation.goBack()
  }

  const onChangeContentHeight = (event) => {
    setContentHeight(event.nativeEvent.contentSize.height)
  }
  return (
    <MainContainer>
      <Container>
        <BasicTextInput
          onChangeText={setTitle}
          placeholder="제목"
          fontSize="20px"
          width="100%"
          smargin="0 0 30px 0"
          value={title}
        />
        <BasicTextInput
          onChangeText={setContent}
          placeholder="내용"
          fontSize="20px"
          smargin="0 0 30px 0"
          value={content}
          multiline={true}
          onContentSizeChange={onChangeContentHeight}
          height={Math.max(contentHeight, 200) + 'px'}
        />
        <View>{children}</View>
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
