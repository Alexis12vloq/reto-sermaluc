"use client";

import React, { useEffect, useState } from "react";
import { Section, Brand } from "../../../lib/api";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

interface SectionFormProps {
  initialData?: Section;
  brands: { data : Brand[] };
  onSubmit: (data: Section) => void;
  loading: boolean;
  error: string | null;
}
interface SectionPayload {
  name: string;
  brand: { id: string };
  status: { id: string };
  categoryId?: number;         // solo en edición
  channels?: [];    // solo en creación (si aún no defines su tipo exacto)
}
const SectionForm: React.FC<SectionFormProps> = ({
  initialData,
  brands,
  onSubmit,
  loading,
  error,
}) => {
  const [name, setName] = useState(initialData?.name || "");
  const [brandId, setBrandId] = useState(initialData?.brand?.id || "");
  const [statusId, setStatusId] = useState(initialData?.status?.id || "A");

  useEffect(() => {
    if (initialData) {
      setName(initialData?.name || "");
      setBrandId(initialData?.brand?.id || "");
      setStatusId(initialData?.status?.id || "A");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Name is required");
      return;
    }
    if (!brandId) {
      alert("Brand is required");
      return;
    }

    const payload: SectionPayload = {
      name,
      brand: { id: brandId },
      status: { id: statusId },
    };

    if (initialData?.id) {
      payload.categoryId = Number(initialData.id);
    } else {
      payload.channels = [];
    }
    
  onSubmit(payload);
  
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", p: 2, border: "1px solid #ccc", borderRadius: 1 }}
    >
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
        disabled={loading}
        required
      />

      <TextField
        select
        label="Brand"
        value={brandId}
        onChange={(e) => setBrandId(e.target.value)}
        fullWidth
        margin="normal"
        disabled={loading}
        required
      >
        {brands.data?.map((brand) => (
          <MenuItem key={brand.id} value={brand.abbreviatedName}>
            {brand.name || brand.id}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Status"
        value={statusId}
        onChange={(e) => setStatusId(e.target.value)}
        fullWidth
        margin="normal"
        disabled={loading}
        required
      >
        <MenuItem value="A">Active</MenuItem>
        <MenuItem value="I">Inactive</MenuItem>
      </TextField>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        disabled={loading}
      >
        {loading ? "Guardando..." : "Guardar"}
      </Button>
    </Box>
  );
};

export default SectionForm;
