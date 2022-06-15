import * as firebase from 'firebase'
import config from '../../firebase.json'

const app = firebase.initializeApp(config)

const Auth = app.auth()

export const login = async ({ email, password }) => {
  await Auth.signInWithEmailAndPassword(email, password)
  return await findUserByEmail(email)
}
export const logout = async () => {
  return await Auth.signOut()
}
export const signup = async ({ email, password, phoneNumber, nickname }) => {
  await Auth.createUserWithEmailAndPassword(email, password)
  await createUser({ email, phoneNumber, nickname })
  return await findUserByEmail(email)
}
export const sendPasswordResetEmail = async (email) => {
  await Auth.sendPasswordResetEmail(email)
}

const DB = firebase.firestore()
export const createUser = async ({ email, phoneNumber, nickname }) => {
  const newUserRef = await DB.collection('users').doc()
  const id = newUserRef.id
  const newUser = { email, phoneNumber, nickname }
  await newUserRef.set(newUser)
  return { id, email, nickname }
}
const convertDocToUser = async (doc) => {
  const data = doc.data()
  return {
    id: doc.id,
    email: data.email,
    nickname: data.nickname,
  }
}
const convertDocsToUsers = async (docs) => {
  const users = []
  for (let i = 0; i < docs.length; i++)
    users.push(await convertDocToUser(docs[i]))
  return users
}
export const findAllUsers = async ({ email, nickname }) => {
  let query = DB.collection('users')
  if (email) query = query.where('email', '==', email)
  if (nickname) query = query.where('nickname', '==', nickname)
  return await convertDocsToUsers((await query.get()).docs)
}
export const findUserByEmail = async (email) => {
  return (await findAllUsers({ email }))[0]
}
export const existEmail = async (email) => {
  let exist = false
  await DB.collection('users')
    .where('email', '==', email)
    .get()
    .then((res) => (exist = !res.empty))
  return exist
}
export const existNickname = async (nickname) => {
  let exist = false
  await DB.collection('users')
    .where('nickname', '==', nickname)
    .get()
    .then((res) => (exist = !res.empty))
  return exist
}
export const existPhoneNumber = async (phoneNumber) => {
  let exist = false
  await DB.collection('users')
    .where('phoneNumber', '==', phoneNumber)
    .get()
    .then((res) => (exist = !res.empty))
  return exist
}
export const findEmailByPhoneNumber = async (phoneNumber) => {
  let email = ''
  await DB.collection('users')
    .where('phoneNumber', '==', phoneNumber)
    .get()
    .then((qs) => (email = qs.docs[0].data().email))
  return email
}

const convertDocToArticle = async (doc) => {
  const data = doc.data()
  const userSS = await data.userRef.get()
  const user = userSS.data()
  // const replies = await findAllReplies({ articleId: doc.id })
  const repliesCount = (
    await DB.collection('replies')
      .where('articleRef', '==', await DB.collection('articles').doc(doc.id))
      .get()
  ).size
  return {
    id: doc.id,
    title: data.title,
    content: data.content,
    type: data.type,
    user: {
      id: userSS.id,
      nickname: user.nickname ? user.nickname : user.email,
      email: user.email,
    },
    repliesCount,
  }
}
const convertDocsToArticles = async (docs) => {
  const articles = []
  for (let i = 0; i < docs.length; i++)
    articles.push(await convertDocToArticle(docs[i]))
  return articles
}

export const createArticle = async ({ title, content, type, userId }) => {
  await DB.collection('articles').add({
    title,
    content,
    type,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    userRef: await DB.collection('users').doc(userId),
  })
}

export const findAllArticles = async ({
  title,
  content,
  type,
  createdAt,
  userId,
}) => {
  let query = DB.collection('articles').orderBy('createdAt', 'desc')
  if (title) query = query.where('title', '==', title)
  if (content) query = query.where('content', '==', content)
  if (type) query = query.where('type', '==', type)
  if (createdAt) query = query.where('createdAt', '==', createdAt)
  if (userId)
    query = query.where(
      'userRef',
      '==',
      await DB.collection('users').doc(articleId)
    )
  return convertDocsToArticles((await query.get()).docs)
}

export const searchBulletinArticles = async (line) => {
  const articles = await findAllArticles({ type: 'BULLETIN' })
  if (!line.trim()) return articles
  const keywords = line.split(' ').map((w) => w.trim())
  const filtered = articles.filter((a) => {
    const title = a.title
    const content = a.content
    for (let i = 0; i < keywords.length; i++) {
      if (title.includes(keywords[i]) || content.includes(keywords[i]))
        return true
    }
    return false
  })
  return filtered
}

export const findArticleById = async (id) => {
  return await convertDocToArticle(
    await DB.collection('articles').doc(id).get()
  )
}

export const findAllReplies = async ({ articleId }) => {
  let query = DB.collection('replies').orderBy('createdAt')
  if (articleId)
    query = query.where(
      'articleRef',
      '==',
      await DB.collection('articles').doc(articleId)
    )
  const ref = await query.get()
  const docs = ref.docs
  const replies = []
  for (let i = 0; i < docs.length; i++) {
    const data = docs[i].data()
    const userSS = await data.userRef.get()
    const user = userSS.data()
    replies.push({
      id: docs[i].id,
      content: data.content,
      createdAt: data.createdAt,
      user: {
        id: userSS.id,
        nickname: user.nickname ? user.nickname : user.email,
        email: user.email,
      },
    })
  }
  return replies
}

export const createReply = async ({
  content,
  createdAt,
  articleId,
  userId,
}) => {
  await DB.collection('replies').add({
    content,
    createdAt: firebase.firestore.Timestamp.fromDate(createdAt),
    articleRef: await DB.collection('articles').doc(articleId),
    userRef: await DB.collection('users').doc(userId),
  })
}

export const deleteReply = async (id) => {
  await DB.collection('replies').doc(id).delete()
}
