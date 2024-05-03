"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"
import { Button, TextField, Typography, Box } from "@mui/material";
import { useAuth } from "../../../hooks/auth";
import { signIn, SignInParams } from  "../../../lib/api/auth"

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();

    try {
      const params: SignInParams = { email: email, password: password}
      await signIn(params);
      router.push('/');
    } catch (error: any) {
      setError(error.response.data.errors[0]);
    }
  };

  return (
    <>
      {error && <Typography color="error">{error}</Typography>}
      <Box
        sx={{
          padding: 3,
          boxShadow: 3,
          bgcolor: 'background.paper',
          borderRadius: 2,
          maxWidth: 400,
          mx: 'auto'
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            label="メールアドレス"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="パスワード"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
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
};

export default Login;
