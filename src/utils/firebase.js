import * as firebase from 'firebase'
import config from '../../firebase.json'

const app = firebase.initializeApp(config)

const Auth = app.auth()

export const login = async ({ email, password }) => {
  const { user } = await Auth.signInWithEmailAndPassword(email, password)
  return user
}
export const logout = async () => {
  return await Auth.signOut()
}
export const signup = async ({ email, password, phoneNumber, nickname }) => {
  const { user } = await Auth.createUserWithEmailAndPassword(email, password)
  await createUser({ email, phoneNumber, nickname })
  return user
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
  return id
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
