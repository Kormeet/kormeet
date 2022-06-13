import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import commentImg from '../../assets/images/comment.png';
import { theme } from '../theme';

const StyledPressable = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 5px 5px;
  border: 1px ${theme.articleButtonBorder};
  margin: 2px 0px;
`;

const TextContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
`;

const ReplyContainer = styled.View`
  flex-direction: row;
`;

const Title = styled.Text`
  text-align: center;
  color: ${theme.text};
  font-size: 17px;
  font-weight: bold;
`;

const Content = styled.Text`
  text-align: center;
  color: ${theme.text};
  font-size: 14px;
`;

const Reply = styled.Text`
  font-size: 13px;
`;

export default function ArticleButton({ title, content, reply, onPress }) {
  return (
    <StyledPressable onPress={onPress}>
      <TextContainer>
        <Title>{title}</Title>
        <Content>{content}</Content>
      </TextContainer>
      <ReplyContainer>
        <Image
          source={commentImg}
          style={{
            width: 10,
            height: 10,
            resizeMode: 'contain',
            marginTop: 3,
            marginRight: 5,
          }}
        />
        <Reply>{reply}</Reply>
      </ReplyContainer>
    </StyledPressable>
  );
}

ArticleButton.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  reply: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
};
