"use client";

import React from "react";
import { useRouter } from "next/navigation";
import SectionForm from "../components/SectionForm";
import { useSectionStore } from "../../../store/useSectionStore";
import { Section } from "../../../lib/api";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { API_TOKEN } from "../../../../config/token";

const token = API_TOKEN

const CreateSectionPage: React.FC = () => {
  const router = useRouter();
  const { brands, fetchBrands, createSection, loading, error } = useSectionStore();

  React.useEffect(() => {
    fetchBrands(token);
  }, [fetchBrands]);

  const handleSubmit = async (data: Section) => {
    await createSection(data, token);
    router.push("/sections");
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Create Section
      </Typography>
      <SectionForm
        brands={brands}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </Box>
  );
};

export default CreateSectionPage;
