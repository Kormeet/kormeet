import React from 'react'
import { Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { theme } from '../theme'

const windowHeight = Dimensions.get('window').height

const Container = styled.View`
  border: 1px ${theme.articleBackground};
  padding: 10px;
`

const Title = styled.Text`
  font-size: 25px;
  font-weight: bold;
`

const Nickname = styled.Text`
  margin-top: 3px;
  font-size: 15px;
`

const Content = styled.Text`
  margin-top: 3px;
  font-size: 20px;
  background-color: lightgray;
`

export default function Article({ title, nickname, content }) {
  return (
    <Container>
      <Title>{title}</Title>
      <Nickname>작성자 : {nickname}</Nickname>
      <Content>{content}</Content>
    </Container>
  )
}

Article.propTypes = {
  title: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}
