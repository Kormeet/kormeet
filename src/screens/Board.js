import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, Image, Pressable, Text } from 'react-native'
import styled from 'styled-components/native'
import BasicButton from '../components/BasicButton'
import BasicTextInput from '../components/BasicTextInput'
import ArticleButton from '../components/ArticleButton'
import { findAllArticles, searchBulletinArticles } from '../utils/firebase'
import { ProgressContext } from '../contexts'
import Refresh from '../../assets/images/refresh.png'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const MainContainer = styled.View`
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  background-color: ${({ theme }) => theme.background};
`

const Container = styled.View`
  width: 75%;
`

const List = styled.ScrollView`
  width: 100%;
  height: ${windowHeight - 250}px;
  margin-top: 15px;
`

const ButtonView = styled.View`
  position: absolute;
  flex-direction: row;
  bottom: 25px;
  align-items: center;
`

const EmptyView = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  margin-top: 30px;
`

const ImageButton = styled.Pressable`
  position: absolute;
  left: ${windowWidth / 2 - 50 - 20}px;
`

const StyledImage = styled.Image`
  tint-color: ${({ theme }) => theme.buttonBackground};
  width: 40px;
`

export default function Board({ navigation, route }) {
  // contexts
  const { spinner } = useContext(ProgressContext)

  // params
  const { articleType } = route.params

  // states
  const [search, setSearch] = useState('')
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEmpty, setIsEmpty] = useState(false)

  const loadArticles = async () => {
    setArticles(await findAllArticles({ type: articleType }))
  }
  const rerenderScreen = async () => {
    spinner.start()
    await loadArticles()
    spinner.stop()
  }
  const renderFirst = async () => {
    setIsLoading(true)
    await rerenderScreen()
    setIsLoading(false)
  }

  useEffect(() => {
    renderFirst()
  }, [])
  useEffect(() => {
    if (articles.length > 0) setIsEmpty(false)
    else setIsEmpty(true)
  }, [articles])
  useEffect(() => {
    return navigation.addListener('focus', loadArticles)
  }, [navigation])

  const searchArticle = async () => {
    spinner.start()
    setArticles(await searchBulletinArticles(search))
    spinner.stop()
  }
  return (
    <MainContainer>
      <Container>
        <BasicTextInput
          placeholder="게시물 검색"
          onChangeText={setSearch}
          width="100%"
          value={search}
          smargin="30px 0 0 0"
          onSubmitEditing={searchArticle}
        />
        {isLoading && (
          <EmptyView>
            <Text>{'loading...'}</Text>
          </EmptyView>
        )}
        {isEmpty && (
          <EmptyView>
            <Text>{'게시물이 없습니다.'}</Text>
          </EmptyView>
        )}
        {!isLoading && !isEmpty && (
          <List
            showsVerticalScrollIndicator={false}
            onScrollToTop={rerenderScreen}
          >
            {articles.map((article) => (
              <ArticleButton
                key={article.id}
                title={article.title}
                content={article.content}
                reply={article.repliesCount}
                onPress={() => {
                  navigation.navigate('BulletinBoardArticle', {
                    articleId: article.id,
                  })
                }}
              />
            ))}
          </List>
        )}
      </Container>
      <ButtonView>
        <BasicButton
          title="게시글 작성"
          onPress={() => {
            navigation.navigate('BulletinBoardWrite', {
              articleType,
            })
          }}
          width="100px"
          isFilled
          fontSize="15px"
        />
        <ImageButton onPress={rerenderScreen}>
          <StyledImage source={Refresh} resizeMode={'contain'} />
        </ImageButton>
      </ButtonView>
    </MainContainer>
  )
}
