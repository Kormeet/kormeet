import React, { useContext } from 'react'
import styled from 'styled-components/native'
import BasicButton from '../components/BasicButton'
import { UserContext } from '../contexts'
import { logout } from '../utils/firebase'

const MainContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`

const Container = styled.View`
  width: 80%;
`

const FormView = styled.View`
  margin: 0 0 20px 0;
`

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 0 0 5px 0;
`

const StyledLabel = styled.Text`
  font-size: 20px;
`

export default function MyInfo({ navigation }) {
  const { user, dispatch } = useContext(UserContext)

  const onLogoutClicked = () => {
    logout()
    dispatch({})
  }

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
          <StyledLabel>(임시 - 구현필요) 최근 게시글이 없습니다</StyledLabel>
        </FormView>
        <FormView>
          <StyledLabel>최근 중고장터</StyledLabel>
          <StyledLabel>(임시) 최근 중고장터가 없습니다</StyledLabel>
        </FormView>
        <FormView>
          <StyledLabel>최근 구인구직</StyledLabel>
          <StyledLabel>(임시) 최근 구인구직이 없습니다</StyledLabel>
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
  )
}
