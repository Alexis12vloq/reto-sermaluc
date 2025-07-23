import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

interface Order {
  id: string;
  order_num: number;
  channel: string;
  created_at: string;
  customer_name: string;
}

interface Props {
  orders: Order[];
}

export default function OrderTable({ orders }: Props) {
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleOpenDetailModal = (order: Order) => {
    setSelectedOrder(order);
    setOpenDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setOpenDetailModal(false);
    setSelectedOrder(null);
  };

  const handleOpenDeleteModal = (order: Order) => {
    setSelectedOrder(order);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedOrder(null);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Orden</TableCell>
            <TableCell>Canal</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.order_num}</TableCell>
              <TableCell>{order.channel}</TableCell>
              <TableCell>{order.customer_name}</TableCell>
              <TableCell>{new Date(order.created_at).toLocaleString()}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => handleOpenDetailModal(order)}>
                  <VisibilityIcon />
                </IconButton>

                <IconButton color="secondary" onClick={() => handleOpenDeleteModal(order)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={orders.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5]}
        onPageChange={handleChangePage}
      />

      <Dialog open={openDetailModal} onClose={handleCloseDetailModal} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>Detalles del Pedido</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Card variant="outlined" sx={{ p: 2, boxShadow: 3 }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1" fontWeight="bold">Orden:</Typography>
                    <Typography variant="body1">{selectedOrder.order_num}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1" fontWeight="bold">Canal:</Typography>
                    <Typography variant="body1">{selectedOrder.channel}</Typography>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1" fontWeight="bold">Cliente:</Typography>
                    <Typography variant="body1">{selectedOrder.customer_name}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1" fontWeight="bold">Fecha:</Typography>
                    <Typography variant="body1">{new Date(selectedOrder.created_at).toLocaleString()}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailModal} color="primary" variant="contained">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography align="center">¿Estás seguro de que deseas eliminar este pedido?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleCloseDeleteModal} color="primary" variant="contained">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}