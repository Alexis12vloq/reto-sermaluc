"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import SectionForm from "../../components/SectionForm";
import { useSectionStore } from "../../../../store/useSectionStore";
import { Section } from "../../../../lib/api";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { API_TOKEN } from "../../../../../config/token";

const token = API_TOKEN;
const EditSectionPage: React.FC = () => {
  const router = useRouter();
  const {
    brands,
    fetchBrands,
    updateSection,
    loading,
    error,
    currentSection,
  } = useSectionStore();

  useEffect(() => {
    console.log(currentSection)
    if (!currentSection) {
      alert("No section data available.");
      router.push("/sections"); // Redirige si no hay datos
    }
  }, [currentSection, router]);

  
  useEffect(() => {
    fetchBrands(token);
  }, [fetchBrands]);

  if (!currentSection) return null;


  const handleSubmit = async (data: Section) => {
    console.log("Submitting section data:", data);
    await updateSection(data, token);
    router.push("/sections");
  };

  if (!currentSection) {
    return <p className="p-4">Loading section data...</p>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Section
      </Typography>
      <SectionForm
        initialData={currentSection}
        brands={brands}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </Box>
  );
};

export default EditSectionPage;
