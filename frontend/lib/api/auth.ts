import client from "./client"
import Cookies from "js-cookie"
import { SignUpParams, SignInParams } from "../../interfaces/auth"

// サインアップ（新規アカウント作成）
export const signUp = (params: SignUpParams) => {
  return client.post("auth", params)
}

// サインイン（ログイン）
export const signIn = (params: SignInParams)  => {
  return client.post("auth/sign_in", params)
}

// サインアウト（ログアウト）
export const signOut = () => {
  return client.delete("auth/sign_out", { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }})  
}

// 認証済みのユーザーを取得
export const getCurrentUser = () => {
  const accessToken = Cookies.get("_access_token");
  const clientToken = Cookies.get("_client");
  const uid = Cookies.get("_uid");

  if (accessToken && clientToken && uid) {
    return client.get("auth/sessions", { 
      headers: {
        "access-token": accessToken,
        "client": clientToken,
        "uid": uid
      }
    });
  }

  return null;
}
