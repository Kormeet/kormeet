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
const DB = firebase.firestore()
export const createUser = async ({ email, phoneNumber, nickname }) => {
  const newUserRef = await DB.collection('users').doc()
  const id = newUserRef.id
  const newUser = { email, phoneNumber, nickname }
  await newUserRef.set(newUser)
  return id
}
export const existEmail = async (email) => {
  const ref = await DB.collection('users')
  let exist = false
  await ref.get().then((res) => {
    res.forEach((doc) => {
      if (doc.data().email === email) {
        exist = true
        return
      }
    })
  })
  return exist
}
export const existNickname = async (nickname) => {
  const ref = await DB.collection('users')
  let exist = false
  await ref.get().then((res) => {
    res.forEach((doc) => {
      if (doc.data().nickname === nickname) {
        exist = true
        return
      }
    })
  })
  return exist
}
export const existPhoneNumber = async (phoneNumber) => {
  const ref = await DB.collection('users')
  let exist = false
  await ref.get().then((res) => {
    res.forEach((doc) => {
      if (doc.data().phoneNumber === phoneNumber) {
        exist = true
        return
      }
    })
  })
  return exist
}
