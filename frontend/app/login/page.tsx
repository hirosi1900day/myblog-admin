"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { RootState } from '../../lib/store';
import { signIn } from '../../lib/api/auth';
import { SignInParams } from '../../interfaces';
import { useSelector } from 'react-redux';
import { Button, TextField, Typography, Box } from '@mui/material';
// reductのuserSliceをimportする
import { updateUser } from '../../lib/store/user';
import { useDispatch } from 'react-redux';
import Cookies from "js-cookie"

export default function Login() {
  const user = useSelector((state: RootState) => state.user);
  console.log(user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let params: SignInParams = {
      email: email,
      password: password
    }

    try {
      const response = await signIn(params);
      Cookies.set("_access_token", response.headers["access-token"]);
      Cookies.set("_client", response.headers["client"]);
      Cookies.set("_uid", response.headers["uid"]);
      Cookies.set("_user_name", response.headers["name"]);
      Cookies.set("_user_email", response.headers["email"]);

      dispatch(updateUser(response.data.data));
      router.push("/");
    } catch (e: any) {
      setError(e.response.data.errors[0]);
    }
  };

  return (
    <>
      {error && <Typography color="error">{error}</Typography>}
      <Box
        sx={{
          padding: 3,
          boxShadow: 3, // 影の強さを調整
          bgcolor: 'background.paper', // 明るい背景色
          borderRadius: 2, // 角丸の設定
          maxWidth: 400, // 最大幅の設定
          mx: 'auto' // 水平方向の中央揃え
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            label="メールアドレス"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined" // ふちを強調
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="パスワード"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined" // ふちを強調
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            ログイン
          </Button>
        </form>
      </Box>
    </>
  );
}
