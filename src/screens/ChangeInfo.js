import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import BasicButton from '../components/BasicButton';
import BasicTextInput from '../components/BasicTextInput';

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

export default function ChangeInfo({ navigation }) {
  // 필드 값
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  // 버튼 활성화 여부
  const [disabled, setDisabled] = useState(true);
  // 인증 및 중복확인 여부
  const [idSuccess, setIdSuccess] = useState(false);
  const [nicknameSuccess, setNicknameSuccess] = useState(false);

  useEffect(() => {
    setDisabled(
      !(id && pw && pwConfirm && nickname && idSuccess && nicknameSuccess)
    );
  }, [id, pw, pwConfirm, nickname, idSuccess, nicknameSuccess]);

  const idChanged = value => {
    if (idSuccess === true) setIdSuccess(false);
    setId(value);
  };

  const nicknameChanged = value => {
    if (nicknameSuccess === true) setNicknameSuccess(false);
    setNickname(value);
  };

  const nicknameConfirmClicked = () => {
    //중복확인 코드
    //만약 (중복없다면)
    // 사용가능한 닉네임입니다. (// 경고 메시지로 수정)
    Alert.alert('', 'ㅇㅈ');
    setNicknameSuccess(true);
    // 만약 (중복있다면)
    // 알림메시지 사용할 수 없는 닉네임입니다. (// 경고 메시지로 수정)
  };

  const idConfirmClicked = () => {
    //중복확인 코드
    //만약 (중복없다면)
    // 사용가능한 아이디입니다.(// 경고 메시지로 수정)
    Alert.alert('ㅇㅈ', 'ㅇㅈ');
    setIdSuccess(true);
    // 만약 (중복있다면)
    // 알림메시지 사용할 수 없는 아이디입니다. (// 경고 메시지로 수정)
  };

  const changeInfoClicked = () => {
    if (pw === pwConfirm) {
      Alert.alert(
        '회원정보 변경',
        '회원님의 회원정보가 정상적으로 변경되었습니다.',
        [
          {
            text: '확인',
            onPress: () => {
              navigation.navigate('MyInfo');
            },
          },
        ]
      );
    } else {
      // 경고 메시지로 수정
      Alert.alert('회원정보 변경', '비밀번호가 일치하지 않습니다', [
        { text: '확인' },
      ]);
    }
  };

  return (
    <MainContainer>
      <Container>
        <FormView>
          <StyledLabel>아이디</StyledLabel>
          <RowContainer>
            <BasicTextInput
              placeholder="아이디 입력"
              onChangeText={idChanged}
              width="78%"
            />
            <BasicButton
              title="중복확인"
              onPress={idConfirmClicked}
              isFilled
              width="20%"
              disabled={!id || idSuccess}
            />
          </RowContainer>
        </FormView>

        <FormView>
          <StyledLabel>비밀번호</StyledLabel>
          <BasicTextInput placeholder="비밀번호 입력" onChangeText={setPw} />
          <StyledLabel>비밀번호 확인</StyledLabel>
          <BasicTextInput
            placeholder="비밀번호 입력"
            onChangeText={setPwConfirm}
          />
        </FormView>

        <FormView>
          <StyledLabel>닉네임</StyledLabel>
          <RowContainer>
            <BasicTextInput
              placeholder="닉네임 입력"
              onChangeText={nicknameChanged}
              width="78%"
            />
            <BasicButton
              title="중복확인"
              onPress={nicknameConfirmClicked}
              isFilled
              width="20%"
              disabled={!nickname || nicknameSuccess}
            />
          </RowContainer>
        </FormView>
        <BasicButton
          title="개인 정보 변경"
          onPress={changeInfoClicked}
          isFilled
          disabled={disabled}
        />
      </Container>
    </MainContainer>
  );
}
