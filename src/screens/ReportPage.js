import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import styled from 'styled-components/native'
import BasicTextInput from '../components/BasicTextInput'
import BasicButton from '../components/BasicButton'
import { Alert, Text } from 'react-native'
import { createArticle } from '../utils/firebase'
import { UserContext } from '../contexts'
import BouncyCheckbox from "react-native-bouncy-checkbox";

const MainContainer = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding-top: 50px;
  height: 100%;
`

const Container = styled.View`
  width: 80%;
`

const BlankContainer = styled.View`
  height: 15%;
`

const BlankContainerTitle = styled.View`
  height: 2%;
`

export default function ReportPage({ navigation, route }) {

  const [content, setContent] = useState('')

  return (
    <MainContainer>
      <Container>
          <BasicTextInput
          onChangeText={setContent}
          placeholder="내용"
          fontSize="20px"
          smargin="0 0 5px 0"
          value={content}
          height="30%"
          multiline={true}
        />
        <BlankContainer/>
         <BouncyCheckbox
        size={25}
        fillColor="blue"
        unfillColor="#FFFFFF"
        text="주제에 맞지 않는 게시글"
        iconStyle={{ borderRadius: 0, borderColor: "blue" }}
        textStyle={{
          textDecorationLine: "none",
        }}
           />
          <BlankContainerTitle/>
          <BouncyCheckbox
        size={25}
        fillColor="blue"
        unfillColor="#FFFFFF"
        text="욕설, 비속어 사용"
        iconStyle={{ borderRadius: 0, borderColor: "blue" }}
        textStyle={{
          textDecorationLine: "none",
        }}
           />
           <BlankContainerTitle/>
          <BouncyCheckbox
        size={25}
        fillColor="blue"
        unfillColor="#FFFFFF"
        text="부적절한 홍보글"
        iconStyle={{ borderRadius: 0, borderColor: "blue" }}
        textStyle={{
          textDecorationLine: "none",
        }}
           />
           <BlankContainerTitle/>
          <BouncyCheckbox
        size={25}
        fillColor="blue"
        unfillColor="#FFFFFF"
        text="기타"
        iconStyle={{ borderRadius: 0, borderColor: "blue" }}
        textStyle={{
          textDecorationLine: "none",
        }}
           />
           <BlankContainer/>
        <BasicButton
          title="신고하기"
          onPress={() => console.log("신고하기")}
          fontSize="30px"
          width="100%"
          smargin="0 0 5px 0"
          isFilled
        />
      </Container>
    </MainContainer>
  )
}
