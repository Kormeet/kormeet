import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import BasicButton from '../components/BasicButton';
import BasicTextInput from '../components/BasicTextInput';
import ArticleButton from '../components/ArticleButton';

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

const List = styled.ScrollView`
  width: 100%;
  height: ${windowHeight - 250}px;
  margin-top: 15px;
`;

const ButtonView = styled.View`
  align-items: flex-end;
`;

export default function JobSearch({ navigation }) {
  // 필드 값
  const [search, setSearch] = useState('');
  return (
    <MainContainer>
      <Container>
        <BasicTextInput
          placeholder="구인글 검색"
          onChangeText={setSearch}
          width="100%"
          value={search}
        >
          검색내용을 입력해주세요
        </BasicTextInput>
        <List>
          <ArticleButton title="제목" content="내용" reply={1}></ArticleButton>
          <ArticleButton title="제목" content="내용" reply={1}></ArticleButton>
        </List>
        <ButtonView>
          <BasicButton
            title="구인글 작성"
            onPress={() => {
              console.log('구인글 작성 화면으로!!');
            }}
            width="100px"
            smargin="8px 0"
            isFilled
          ></BasicButton>
        </ButtonView>
      </Container>
    </MainContainer>
  );
}
