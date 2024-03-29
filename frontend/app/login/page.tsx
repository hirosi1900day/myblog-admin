"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { signIn } from '../../lib/api/auth';
import { SignInParams } from '../../interfaces';
import { Button, TextField, Typography, Box } from '@mui/material';
import Cookies from "js-cookie"

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

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
        <Typography variant="h6" component="h2" gutterBottom>
          ログイン
        </Typography>
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