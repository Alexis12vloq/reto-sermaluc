"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import OrderTable from "@/components/OrderTable";
import { Container, Typography, Button, Box } from "@mui/material";
import { getOrders } from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import { useOrderStore } from "@/store/useOrderStore";

export default function OrderPage() {
  const { getToken, logout } = useAuthStore();
  const { orders, setOrders } = useOrderStore();
  const router = useRouter();
  const token = getToken();

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const data = await getOrders(token);
        setOrders(data);
      } catch {
        logout();
        router.push("/login");
      }
    };

    fetchOrders();
  }, [token, router, setOrders, logout]);

  return (
    <Container>
      <Box sx={{ mt: 5, mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4">Mis Pedidos</Typography>
        <Button variant="contained" color="secondary" onClick={logout}>
          Cerrar sesión
        </Button>
      </Box>
      <OrderTable orders={orders} />
    </Container>
  );
}