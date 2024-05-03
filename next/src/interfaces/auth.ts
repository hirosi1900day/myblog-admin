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
