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

// ユーザー
export interface User {
  email: string
  name: string
}