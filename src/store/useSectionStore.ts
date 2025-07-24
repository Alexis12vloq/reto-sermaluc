import { create } from "zustand";
import { Section, Brand, SectionResponse } from "../lib/api";

interface SectionState {
  sections: SectionResponse;
  brands: {data : Brand[]};
  loading: boolean;
  error: string | null;
  currentSection: Section | null;
  fetchSections: (token: string, filter?: string, limit?: number) => Promise<void>;
  fetchBrands: (token: string) => Promise<void>;
  createSection: (section: Section, token: string) => Promise<void>;
  updateSection: (section: Section, token: string) => Promise<void>;
  deleteSection: (id: number | string, token: string) => Promise<void>;
  setCurrentSection: (section: Section | null) => void;
  clearError: () => void;
}

export const useSectionStore = create<SectionState>((set, get) => ({
  sections: {data: []},
  brands: { data : [] },
  loading: false,
  error: null,
  currentSection: null,
  
  fetchSections: async (token: string, filter = "", limit = 10) => {
    set({ loading: true, error: null });
    try {
      const data = await import("../lib/api").then((mod) =>
        mod.listSections(token, filter, limit)
      );
      set({ sections: data, loading: false });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to fetch sections";
      set({ error: message, loading: false });
    }
  },

  fetchBrands: async (token: string) => {
    set({ loading: true, error: null });
    try {
      const data = await import("../lib/api").then((mod) => mod.listBrands(token));
      set({ brands: data, loading: false });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to fetch brands";
      set({ error: message, loading: false });
    }
  },

  createSection: async (section: Section, token: string) => {
    set({ loading: true, error: null });
    try {
      await import("../lib/api").then((mod) => mod.createSection(section, token));
      await get().fetchSections(token);
      set({ loading: false });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to create section";
      set({ error: message, loading: false });
    }
  },

  updateSection: async (section: Section, token: string) => {
    set({ loading: true, error: null });
    try {
      await import("../lib/api").then((mod) => mod.updateSection(section, token));
      await get().fetchSections(token);
      set({ loading: false });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to update section";
      set({ error: message, loading: false });
    }
  },

  deleteSection: async (id: number | string, token: string) => {
    set({ loading: true, error: null });
    try {
      await import("../lib/api").then((mod) => mod.deleteSection(id, token));
      await get().fetchSections(token);
      set({ loading: false });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to delete section";
      set({ error: message, loading: false });
    }
  },

  setCurrentSection: (section: Section | null) => set({ currentSection: section }),

  clearError: () => set({ error: null }),
}));
