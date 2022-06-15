import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';
import ArticleButton from '../components/ArticleButton'

const MainContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

const Container = styled.View`
  width: 80%;
`

const BlankContainer = styled.View`
  height: 10%;
`

export default function MainPage() {
  return (
    <MainContainer>
      <Container>
      <Text>최근 게시글</Text>
      <ArticleButton
      title=''
      content=''
      reply={3}
      onPress={() => console.log("게시글 버튼")}/>
      <BlankContainer/>
      <Text>최근 중고장터</Text>
      <ArticleButton
      title=''
      content=''
      reply={3}
      onPress={() => console.log("중고장터 버튼")}/>
      <BlankContainer/>
      <Text>최근 구인구직</Text>
      <ArticleButton
      title=''
      content=''
      reply={3}
      onPress={() => console.log("구인구직 버튼")}/>
      </Container>
    </MainContainer>
  );
}
