import React, { useContext, useState } from 'react'
import styled from 'styled-components/native'
import BasicTextInput from '../components/BasicTextInput'
import BasicButton from '../components/BasicButton'
import { Alert, Text, View } from 'react-native'
import { createArticle } from '../utils/firebase'
import { ProgressContext, UserContext } from '../contexts'

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

export default function ArticleWrite({
  navigation,
  route,
  Inputs,
  beforeSubmit: _beforeSubmit,
  onSubmit: _onSubmit,
}) {
  const { user } = useContext(UserContext)
  const { spinner } = useContext(ProgressContext)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [contentHeight, setContentHeight] = useState(0)

  const { articleType } = route.params

  const beforeSubmit = () => {
    const _title = title.trim()
    const _content = content.trim()
    if (_title.length < 1) {
      Alert.alert('게시글 작성', '제목을 입력해주세요')
      return false
    }
    if (_content.length < 1) {
      Alert.alert('게시글 작성', '내용을 입력해주세요')
      return false
    }
    if (_beforeSubmit) return _beforeSubmit()
    else return true
  }

  const onClickSubmit = async () => {
    spinner.start()
    if (!beforeSubmit()) return
    const articleId = await createArticle({
      title: title.trim(),
      content: content.trim(),
      type: articleType,
      userId: user.id,
    })
    if (_onSubmit) _onSubmit(articleId)
    navigation.goBack()
    spinner.stop()
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
        {Inputs}
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
