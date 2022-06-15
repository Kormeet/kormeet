import React, { useContext } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import BasicButton from '../components/BasicButton';
import ArticleButton from '../components/ArticleButton';
import { UserContext } from '../contexts';
import { logout } from '../utils/firebase';

const MainContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

const Container = styled.View`
  width: 80%;
`;

const FormView = styled.View`
  margin: 0 0 20px 0;
`;

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 0 0 5px 0;
`;

const StyledLabel = styled.Text`
  font-size: 20px;
`;

export default function MyInfo({ navigation }) {
  const { user, dispatch } = useContext(UserContext);

  const onLogoutClicked = () => {
    Alert.alert('로그아웃', '정말 로그아웃 하시겠습니까?', [
      {
        text: '아니요',
        style: 'cancel',
      },
      {
        text: '네',
        onPress: () => {
          logout();
          dispatch({});
        },
      },
    ]);
  };

  return (
    <MainContainer>
      <Container>
        <FormView>
          <RowContainer>
            <StyledLabel>닉네임</StyledLabel>
            <StyledLabel>{user.nickname}</StyledLabel>
          </RowContainer>
        </FormView>
        <FormView>
          <StyledLabel>최근 게시글</StyledLabel>
          <ArticleButton
            title="최근에 작성한 게시글 1"
            content="미구현 상태입니다"
            reply={3}
            onPress={() =>
              console.log('(미구현) 게시글 내용 불러오기 및 해당 게시글로 이동')
            }
          />
        </FormView>
        <FormView>
          <StyledLabel>최근 중고장터</StyledLabel>
          <ArticleButton
            title="최근에 작성한 중고장터 글 1"
            content="미구현 상태입니다"
            reply={8}
            onPress={() =>
              console.log(
                '(미구현) 중고장터 글 내용 불러오기 및 해당 중고장터 글로 이동'
              )
            }
          />
        </FormView>
        <FormView>
          <StyledLabel>최근 구인구직</StyledLabel>
          <ArticleButton
            title="최근에 작성한 구인구직 글 1"
            content="미구현 상태입니다"
            reply={5}
            onPress={() =>
              console.log(
                '(미구현) 구인구직 글 내용 불러오기 및 해당 구인구직 글로 이동'
              )
            }
          />
        </FormView>
        <RowContainer>
          <BasicButton
            title="개인 정보 변경"
            onPress={() => navigation.navigate('ConfirmPw')}
            isFilled
          />
          <BasicButton title="로그아웃" onPress={onLogoutClicked} isFilled />
        </RowContainer>
      </Container>
    </MainContainer>
  );
}
