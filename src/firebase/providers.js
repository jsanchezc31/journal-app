import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

//Para que siempre pida el email 
googleProvider.setCustomParameters({
  prompt: 'select_account'
})

export const signInWithGoogle = async () => {

  try {

    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;
    const { displayName, email, photoURL, uid } = user;

    return {
      ok: true,
      // user info
      displayName, email, photoURL, uid
    }
  } catch (error) {
    // console.log(error);
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      ok: false,
      errorMessage
    }

  }

}

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
  try {

    const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
    const { uid, photoURL } = resp.user;

    // console.log(resp);

    // TODO: actualizar el displayName en Firebase
    await updateProfile(FirebaseAuth.currentUser, { displayName })

    return {
      ok: true,
      uid, photoURL, email, displayName
    }

  } catch (error) {

    return { ok: false, errorMessage: error.message }
  }
}

export const loginWithEmailPassword = async ({ email, password }) => {

  console.log('login:', email, password);
  try {

    const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL, displayName } = resp.user;

    return {
      ok: true,
      uid, photoURL, displayName
    }

  } catch (error) {
    console.log(error);
    return { ok: false, errorMessage: error.message }

  }

}

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
};

