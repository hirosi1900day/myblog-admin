import client from "./client"
import Cookies from "js-cookie"
import { User } from "../../interfaces/user"

export interface UseAuthReturnType {
  loginUser: (email: string, password: string) => Promise<void>;
}

export interface SignUpParams {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

// サインイン
export interface SignInParams {
  email: string
  password: string
}

// サインアップ（新規アカウント作成）
export const signUp = async (params: SignUpParams): Promise<User>  => {
  const response = await client.post("auth", params)
  Cookies.set("_access_token", response.headers["access-token"]);
  Cookies.set("_client", response.headers["client"]);
  Cookies.set("_uid", response.headers["uid"]);
  Cookies.set("_user_name", response.data.data.name);
  Cookies.set("_user_email", response.data.data.email);

  return response.data.data
}

// サインイン（ログイン）
export const signIn = async (params: SignInParams): Promise<User>  => {
  const response = await client.post("auth/sign_in", params)
  Cookies.set("_access_token", response.headers["access-token"]);
  Cookies.set("_client", response.headers["client"]);
  Cookies.set("_uid", response.headers["uid"]);
  Cookies.set("_user_name", response.data.data.name);
  Cookies.set("_user_email", response.data.data.email);

  return response.data.data
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
