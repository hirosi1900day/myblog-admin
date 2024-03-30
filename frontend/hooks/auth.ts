import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { signIn } from '../lib/api/auth';
import { updateUser } from '../lib/store/user';
import { SignInParams } from '../interfaces/auth';
import { UseAuthReturnType } from '../interfaces/auth';

export const useAuth = (): UseAuthReturnType => {
  const dispatch = useDispatch();

  const loginUser = async (email: string, password: string): Promise<void> => {
    try {
      const params: SignInParams = { email, password };
      const response = await signIn(params);

      // Cookieに認証情報を設定
      Cookies.set("_access_token", response.headers["access-token"]);
      Cookies.set("_client", response.headers["client"]);
      Cookies.set("_uid", response.headers["uid"]);
      Cookies.set("_user_name", response.data.data.name);
      Cookies.set("_user_email", response.data.data.email);

      // ユーザー情報をReduxストアに保存
      dispatch(updateUser(response.data.data));
    } catch (error) {
      throw error;
    }
  };

  return { loginUser };
};
