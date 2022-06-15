import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { theme } from '../theme'
import BasicButton from './BasicButton'

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const ContentView = styled.View`
  width: ${({ isMine }) => (isMine ? '80%' : '100%')};
`

const Nickname = styled.Text`
  font-size: 20px;
  color: ${(props) => (props.isMine ? theme.myCommentText : theme.text)};
`

const Content = styled.Text`
  font-size: 20px;
  color: ${theme.text};
`

export default function Comment({
  nickname,
  content,
  isMine,
  onDeleteClicked,
}) {
  return (
    <Container>
      <ContentView isMine={isMine}>
        <Nickname isMine={isMine}>{nickname}</Nickname>
        <Content>ㄴ{content}</Content>
      </ContentView>
      {isMine && (
        <BasicButton
          title="삭제"
          fontSize="15px"
          isFilled
          onPress={onDeleteClicked}
        />
      )}
    </Container>
  )
}

Content.propTypes = {
  nickname: PropTypes.string,
  content: PropTypes.string,
  isMine: PropTypes.bool,
}
