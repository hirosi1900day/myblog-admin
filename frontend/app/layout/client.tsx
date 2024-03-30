"use client";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../lib/store/user'; // ユーザー情報を更新する updateUser 関数をインポート
import Cookies from 'js-cookie';

// AppPropsを使用して、ComponentとpagePropsの型を指定
function ClientLayout({children}:  & {children: React.ReactNode}) {
  const dispatch = useDispatch();

  useEffect(() => {
    const user_name = Cookies.get('_user_name');
    const user_email = Cookies.get('_user_email');

    if (user_name && user_email) {
      const user = {
        name: user_name,
        email: user_email,
      };

      dispatch(updateUser(user)); // Redux ストアにユーザー情報をセット
    }
  }, [dispatch]);

  // JSX要素を返す
  return (
    <>
      <div>テスト</div>
      {children}
    </>
    )
;
}

export default ClientLayout;
