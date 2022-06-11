import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import BasicButton from '../components/BasicButton';
import BasicTextInput from '../components/BasicTextInput';

const windowHeight = Dimensions.get('window').height;

const MainContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
`;

const Container = styled.View`
  width: 75%;
`;

const Title = styled.Text`
  font-size: 25px;
  font-weight: bold;
`;

const Content = styled.Text`
  margin-top: 3px;
  height: ${windowHeight / 3}px;
  font-size: 20px;
`;

const Comment = styled.Text`
  font-size: 20px;
`;

const List = styled.ScrollView`
  width: 100%;
  height: ${windowHeight / 3}px;
  margin-top: 15px;
`;

const ButtonView = styled.View`
  justify-content: space-between;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 5px 0;
`;

export default function JobSearchArticle({ navigation }) {
  // 필드 값
  const [comment, setComment] = useState('');
  const [reply, setReply] = useState('');
  return (
    <MainContainer>
      <Container>
        <Title>구인구직 제목</Title>
        <Content>구인구직 게시글 내용</Content>
        <ButtonView>
          <RowContainer>
            <BasicButton
              title="이력서 등록하기"
              onPress={() => {
                console.log('이력서 등록하기 화면으로!!');
              }}
              isFilled
            ></BasicButton>
            <BasicButton
              title="신고하기"
              onPress={() => {
                console.log('신고하기 화면으로!!');
              }}
              isFilled
            ></BasicButton>
          </RowContainer>
        </ButtonView>
        <List>
          <RowContainer>
            <Comment>내가 입력한 댓글</Comment>
            <BasicButton title="수정" fontSize="20px" isFilled></BasicButton>
          </RowContainer>
          <Comment>ㄴ 닉네임: 답글</Comment>
          <RowContainer>
            <BasicTextInput
              placeholder="답글작성"
              onChangeText={setReply}
              fontSize="20px"
              width="80%"
              value={reply}
            ></BasicTextInput>
            <BasicButton title="등록" isFilled fontSize="20px"></BasicButton>
          </RowContainer>
          <RowContainer>
            <BasicTextInput
              placeholder="댓글작성"
              onChangeText={setComment}
              fontSize="20px"
              width="80%"
              value={comment}
            ></BasicTextInput>
            <BasicButton title="등록" isFilled fontSize="20px"></BasicButton>
          </RowContainer>
        </List>
      </Container>
    </MainContainer>
  );
}
