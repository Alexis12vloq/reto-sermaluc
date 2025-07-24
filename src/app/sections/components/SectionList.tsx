"use client";

import React, { useState } from "react";
import { SectionResponse } from "../../../lib/api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import { useSectionStore } from "@/store/useSectionStore";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface SectionListProps {
  sections: SectionResponse;
  loading: boolean;
  error: string | null;
  onDelete: (id: number | string) => void;
}

const SectionList: React.FC<SectionListProps> = ({
  sections,
  loading,
  error,
  onDelete,
}) => {
  const [deleteId, setDeleteId] = useState<number | string | null>(null);
  const {
    setCurrentSection,
  } = useSectionStore();
  const confirmDelete = (id: number | string) => {
    setDeleteId(id);
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  const handleDelete = () => {
    if (deleteId !== null) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <TableContainer component={Paper} sx={{ maxWidth: '100%', mx: "auto", mt: 4 }}>
      {error && <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>}
      {loading && <Alert severity="info" sx={{ m: 2 }}>Loading...</Alert>}
      {!loading && sections.data.length === 0 && (
        <Alert severity="warning" sx={{ m: 2 }}>
          No sections found.
        </Alert>
      )}

      <Table aria-label="sections table">
        <TableHead>
          <TableRow>
               <TableCell align="center">ID</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Brand</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sections.data.map((section) => (
         <TableRow key={section.id}>
        <TableCell align="center">{section.id}</TableCell>
        <TableCell align="center">{section.name}</TableCell>
        <TableCell align="center">{section.brand?.name}</TableCell>
        <TableCell align="center">{section.status?.name}</TableCell>
        <TableCell align="center">
          <Button
            onClick={() => {
              setCurrentSection(section);
            }}
            href={`/sections/edit/${section.id}`}
            variant="text"
            component={Link}
            color="primary"
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
          <Button
            variant="text"
            color="error"
            onClick={() => confirmDelete(section.id!)}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog
        open={deleteId !== null}
        onClose={cancelDelete}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this section?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default SectionList;
