"use client";

import React, { useEffect, useState } from "react";
import { useSectionStore } from "../../store/useSectionStore";
import SectionList from "./components/SectionList";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { API_TOKEN } from "../../../config/token";
const SectionsPage: React.FC = () => {
  const token = API_TOKEN
  const {
    sections,
    loading,
    error,
    fetchSections,
    deleteSection,
  } = useSectionStore();

  const [filter, setFilter] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [limit] = useState(10);

  useEffect(() => {
    fetchSections(token, filter, limit);
  }, [filter, limit, fetchSections, token]);

  const handleDelete = (id: number | string) => {
      deleteSection(id, token);
  };

  const handleSearchClick = () => {
    setFilter(inputValue);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Sections
      </Typography>

      <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
        <TextField
          label="Filter by name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          variant="outlined"
          size="small"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearchClick}
        >
          Search
        </Button>
        <Button
          href="/sections/create"
          variant="contained"
          color="primary"
        >
          New Section
        </Button>
      </Box>

      <SectionList
        sections={sections}
        loading={loading}
        error={error}
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default SectionsPage;
