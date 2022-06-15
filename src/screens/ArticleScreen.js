import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components/native'
import BasicButton from '../components/BasicButton'
import BasicTextInput from '../components/BasicTextInput'
import Article from '../components/Article'
import Comment from '../components/Comment'
import {
  createReply,
  deleteArticle,
  deleteReply,
  findAllReplies,
  findArticleById,
} from '../utils/firebase'
import { ProgressContext, UserContext } from '../contexts'
import { Alert } from 'react-native'

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

export default function ArticleScreen({ navigation, route }) {
  // contexts
  const { spinner } = useContext(ProgressContext)
  const { user } = useContext(UserContext)

  // params
  const { articleId } = route.params

  // states
  const [comment, setComment] = useState('') // 댓글작성
  const [article, setArticle] = useState({})
  const [replies, setReplies] = useState([])
  const [loading, setLoading] = useState(true)

  // refs
  const replyRef = useRef()

  const loadArticle = async () => {
    setArticle(await findArticleById(articleId))
  }
  const loadReplies = async () => {
    setReplies(await findAllReplies({ articleId }))
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
  const onReplyDeleteClicked = (id) => async () => {
    spinner.start()
    await deleteReply(id)
    await loadReplies()
    Alert.alert('댓글 삭제', '댓글을 삭제하였습니다.')
    spinner.stop()
  }
  const onArticleDeleteClicked = (id) => async () => {
    replies.forEach((r) => deleteReply(r.id))
    await deleteArticle(id)
    Alert.alert('게시글 삭제', '게시글을 삭제하였습니다.')
    navigation.goBack()
  }

  const onCommentSubmit = async () => {
    await createReply({
      content: comment,
      articleId,
      userId: user.id,
      createdAt: new Date(),
    })
    loadReplies()
    setComment('')
    replyRef.current.blur()
  }

  return (
    <MainContainer>
      {loading || (
        <Container showsVerticalScrollIndicator={false}>
          <ArticleContainer>
            <Article
              title={article.title}
              nickname={article.user.nickname}
              content={article.content}
            />
            <ButtonView>
              {user.id === article.user.id ? (
                <BasicButton
                  title="삭제"
                  onPress={onArticleDeleteClicked(article.id)}
                  isFilled
                />
              ) : (
                <BasicButton
                  title="신고"
                  onPress={() => {
                    navigation.navigate('ReportPage')
                  }}
                  isFilled
                />
              )}
            </ButtonView>
          </ArticleContainer>
          <CommentList>
            {replies.map((reply) => (
              <Comment
                key={reply.id}
                nickname={reply.user.nickname}
                content={reply.content}
                isMine={reply.user.email === user.email ? true : false}
                onDeleteClicked={onReplyDeleteClicked(reply.id)}
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
          inputRef={replyRef}
        />
        <BasicButton
          title="등록"
          isFilled
          fontSize="20px"
          width={'20%'}
          onPress={onCommentSubmit}
        />
      </PostComment>
    </MainContainer>
  )
}
