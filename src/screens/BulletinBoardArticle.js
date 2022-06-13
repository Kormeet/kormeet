import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import styled from 'styled-components/native'
import PropTypes from 'prop-types'
import BasicButton from '../components/BasicButton'
import BasicTextInput from '../components/BasicTextInput'
import Article from '../components/Article'
import Comment from '../components/Comment'
import { findAllReplies, findArticleById } from '../utils/firebase'
import { ProgressContext, UserContext } from '../contexts'

const MainContainer = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding-top: 20px;
  height: 100%;
`

const Container = styled.ScrollView`
  width: 80%;
  height: 100%;
`

const ArticleContainer = styled.View``

const CommentList = styled.ScrollView`
  width: 100%;
  margin-top: 15px;
  padding-bottom: 40px;
`

const PostComment = styled.View`
  position: absolute;
  bottom: -10px;
  background-color: white;
  margin: 10px 0;
  width: 100%;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`

const ButtonView = styled.View`
  align-items: flex-end;
  margin-top: 10px;
`

export default function BulletinBoardArticle({ navigation, route }) {
  // contexts
  const { spinner } = useContext(ProgressContext)
  const { user } = useContext(UserContext)

  // navigation params
  const { articleId } = route.params

  // states
  const [comment, setComment] = useState('') // 댓글작성
  const [article, setArticle] = useState({})
  const [replies, setReplies] = useState([])
  const [loading, setLoading] = useState(true)

  const loadArticle = async () => {
    setArticle(await findArticleById(articleId))
  }
  const loadReplies = async () => {
    const _replies = await findAllReplies({ articleId })
    console.log(_replies)
    setReplies(_replies)
  }
  const loadData = async () => {
    setLoading(true)
    spinner.start()
    await loadArticle()
    await loadReplies()
    setLoading(false)
    spinner.stop()
  }
  useEffect(() => {
    loadData()
  }, [])

  return (
    <MainContainer>
      {loading || (
        <Container showsVerticalScrollIndicator={false}>
          <ArticleContainer>
            <Article
              title={article.title}
              nickname={'nick'}
              content={article.content}
            />
            <ButtonView>
              <BasicButton
                title="신고하기"
                onPress={() => {
                  console.log('신고하기 화면으로!!')
                }}
                isFilled
              />
            </ButtonView>
          </ArticleContainer>
          <CommentList>
            {replies.map((reply) => (
              <Comment
                nickname={reply.user.nickname}
                content={reply.content}
                isMine={reply.user.email === user.email ? true : false}
              />
            ))}
          </CommentList>
        </Container>
      )}
      <PostComment>
        <BasicTextInput
          placeholder="댓글작성"
          onChangeText={setComment}
          fontSize="20px"
          width="80%"
          value={comment}
          multiline
        />
        <BasicButton title="등록" isFilled fontSize="20px" width={'20%'} />
      </PostComment>
    </MainContainer>
  )
}

BulletinBoardArticle.propTypes = {}
