import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { theme } from '../theme';
import BasicButton from './BasicButton';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ContentView = styled.View``;

const Nickname = styled.Text`
  font-size: 20px;
  color: ${props => (props.isMine ? theme.myCommentText : theme.text)};
`;

const Content = styled.Text`
  font-size: 20px;
  color: ${theme.text};
`;

export default function Comment({ nickname, content, isMine }) {
  return isMine ? (
    <Container>
      <ContentView>
        <Nickname isMine>{nickname}</Nickname>
        <Content>ㄴ{content}</Content>
      </ContentView>
      <BasicButton title="수정" fontSize="20px" isFilled></BasicButton>
    </Container>
  ) : (
    <ContentView>
      <Nickname>{nickname}</Nickname>
      <Content>ㄴ{content}</Content>
    </ContentView>
  );
}

Content.propTypes = {
  nickname: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  isMine: PropTypes.bool,
};
