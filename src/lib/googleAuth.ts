import { getAuth, getIdToken, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "./firebase";
import { UserData } from "../types/types";
import { deleteAuthCookie, setAuthCookie } from "@services/authCookiesService";

export const signIn = async (): Promise<UserData | { error: string }> => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);

  try {
    const credentials = await signInWithPopup(auth, provider);
    const token = await getIdToken(credentials.user)

    await setAuthCookie(token)
    return mapUserFromFirebaseAuthToUser(credentials.user);

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      return { error: error.message };
    } else {
      console.log("Error desconocido: ", error);
      return { error: "Unknown error" };
    }
  }
};

export const signOut = async () => {
  if (!getAuth(app)) return
  try {
    await getAuth(app).signOut();
    const res = await deleteAuthCookie()

    if (res.ok) {
      console.log("Sesión cerrada y cookie eliminada")
    } else {
      console.error("Error al eliminar la cookie:", res.statusText)
    }
  } catch (error) {
    console.error("Error al cerrar sesión: ", error);
  }
};

export const onAuthStateChanged = (callback: (user: UserData | null) => void) => {
  const auth = getAuth(app);
  const unsubscribe = auth.onAuthStateChanged(user => {
    if (user) {
      callback(mapUserFromFirebaseAuthToUser(user));
    } else {
      callback(null);
    }
  });

  return unsubscribe;
}

const mapUserFromFirebaseAuthToUser = (user: any): UserData => {
  const { displayName, photoURL, uid, email } = user;

  if (!displayName || !photoURL || !uid || !email) {
    throw new Error("No se pudo obtener el usuario de Google");
  }

  return { name: displayName, image: photoURL, uid, email };
}