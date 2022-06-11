import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import BasicButton from '../components/BasicButton';
import BasicTextInput from '../components/BasicTextInput';
import Article from '../components/Article';
import Comment from '../components/Comment';

const windowHeight = Dimensions.get('window').height;

const MainContainer = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

const Container = styled.View`
  width: 80%;
  height: 100%;
  justify-content: space-between;
`;

const ArticleContainer = styled.View``;

const CommentList = styled.ScrollView`
  width: 100%;
  height: ${windowHeight / 5}px;
  margin-top: 15px;
`;

const PostComment = styled.View`
  margin: 10px 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ButtonView = styled.View`
  align-items: flex-end;
  margin-top: 10px;
`;

export default function BulletinBoardArticle({ navigation }) {
  // 필드 값
  const [comment, setComment] = useState(''); // 댓글작성
  return (
    <MainContainer>
      <Container>
        <ArticleContainer>
          <Article
            title="게시글 제목"
            nickname="익명"
            content="내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용"
          ></Article>
          <ButtonView>
            <BasicButton
              title="신고하기"
              onPress={() => {
                console.log('신고하기 화면으로!!');
              }}
              isFilled
            ></BasicButton>
          </ButtonView>
        </ArticleContainer>
        <CommentList>
          <Comment
            nickname="한별짱짱123"
            content="
              완전 대박입니다요"
            isMine
          ></Comment>
          <Comment
            nickname="USER1"
            content="
              헐러러러러러ㅓ러러ㅓㅓ러러러러럴"
          ></Comment>
        </CommentList>
        <PostComment>
          <BasicTextInput
            placeholder="댓글작성"
            onChangeText={setComment}
            fontSize="20px"
            width="80%"
            value={comment}
          ></BasicTextInput>
          <BasicButton title="등록" isFilled fontSize="20px"></BasicButton>
        </PostComment>
      </Container>
    </MainContainer>
  );
}
