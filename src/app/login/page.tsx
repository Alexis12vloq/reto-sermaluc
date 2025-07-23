"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { loginUser } from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";

export default function LoginPage() {
  const { getToken, setToken } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      router.push("/order");
    }
  }, [getToken, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      setToken(data.token);
      router.push("/order");
    } catch {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "background.paper" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Iniciar Sesión
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Image src="/simplifud_logo.jpg" alt="Simplifud Logo" width={200} height={200} />
        </Box>

        <form onSubmit={handleLogin}>
          <TextField fullWidth label="Email" variant="outlined" margin="normal" onChange={(e) => setEmail(e.target.value)} required />
          <TextField fullWidth type="password" label="Contraseña" variant="outlined" margin="normal" onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Iniciar Sesión
          </Button>
        </form>
      </Box>
    </Container>
  );
}
