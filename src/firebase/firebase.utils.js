import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDmqu9EP261Oaus8FgS1jGSLM2ofXPMsjY",
  authDomain: "reacttutdb.firebaseapp.com",
  databaseURL: "https://reacttutdb.firebaseio.com",
  projectId: "reacttutdb",
  storageBucket: "",
  messagingSenderId: "939592895474",
  appId: "1:939592895474:web:37fb5d686c5cb50a5eb96b",
  measurementId: "G-LF8W0NQ1VJ"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
