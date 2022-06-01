import * as firebase from 'firebase'
import config from '../../firebase.json'

const app = firebase.initializeApp(config)

const Auth = app.auth()

export const login = async ({ email, password }) =>
  await Auth.signInWithEmailAndPassword(email, password)
export const logout = async () => await Auth.signOut()
