import { async } from "@firebase/util";
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCredentiales, login, logout } from "./authSlice";


export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentiales());
  }
}


export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentiales());
    const result = await signInWithGoogle();
    console.log(result)

    if (!result.ok) {
      return dispatch(logout(result.errorMessage));
    }

    dispatch(login(result));
  }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {

  return async (dispatch) => {
    dispatch(checkingCredentiales());

    const resp = await registerUserWithEmailPassword({ email, password, displayName })
    console.log(resp)

    const { ok, uid, photoURL, errorMessage } = resp;

    if (!ok) {
      return dispatch(logout({ errorMessage }));
    }

    dispatch(login({ uid, email, displayName, photoURL }));
  }
}

export const startLoginWithEmailPassword = ({ email, password }) => {

  return async (dispatch) => {
    dispatch(checkingCredentiales());

    const result = await loginWithEmailPassword({ email, password });
    console.log(result);

    if (!result.ok) return dispatch(logout(result));

    dispatch(login(result));

  }

}

export const startLogout = () => {
  return async (dispatch) => {

    await logoutFirebase();
    dispatch(logout({}))
    //  Eliminar las notas al cerrar sesión
    dispatch(clearNotesLogout());

  }
};