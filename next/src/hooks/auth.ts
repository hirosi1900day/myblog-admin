import { useDispatch } from "react-redux";
import { updateUser } from "../lib/store/user";
import { User } from "../interfaces/user";
import { UseAuthReturnType } from "../interfaces/auth";


export const useAuth = (): UseAuthReturnType => {
  const dispatch = useDispatch();

  const loginUser = async (email: string, name: string): Promise<void> => {
    try {
      // ユーザー情報をReduxストアに保存
      const user: User = { email: email, name: name }
      dispatch(updateUser(user));
    } catch (error) {
      throw error;
    }
  };

  return { loginUser };
};
