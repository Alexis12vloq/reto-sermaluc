import axios from "axios";

const API_LOGIN = "https://reqres.in/api/login";
const API_ORDERS = "https://67aa117865ab088ea7e58c36.mockapi.io/api/v1/order";
const API_BASE = "https://apiqa.franquiciasperu.com";

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(API_LOGIN, { email, password });
  return response.data;
};

export const getOrders = async (token: string) => {
  const response = await axios.get(API_ORDERS, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Sections API

export interface Brand {
  id: string;
  abbreviatedName?: string;
}

export interface Status {
  id: string;
}
export interface SectionResponse {
  data: Section[];
}
export interface Section {
  id?: string | number; 
  name?: string;
  nameEng?: string | null;
  status?: Status;
  brand?: Brand;
  order?: string;
  urlImage?: string | null;
  channels?: ChannelSection[];
  auditInformation?: AuditInformation;
}

export interface Brand {
  id: string;
  name?: string;
}
export interface Status {
  id: string;
  name?: string;
}
export interface ChannelSection {
  id: number;
  channel: {
    id: number;
    name: string;
  };
  status: Status;
  online: boolean;
  startDate: string;
  endDate: string;
  statusSchedule: Status;
  schedules: Schedule[];
  auditInformation: AuditInformation;
  order: number;
}
export interface Schedule {
  dayId: number;
  dayName: string;
  startHour: string;
  endHour: string;
  status: Status;
}
export interface AuditInformation {
  creationUser: string;
  creationDate: string;
  modificationUser: string;
  modificationDate: string;
}


export const createSection = async (section: Section, token: string) => {
  const response = await axios.post(
    `${API_BASE}/products/v1/categories`,
    section,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const listSections = async (
  token: string,
  categoryName?: string,
  limit: number = 10
) => {
  const name = categoryName?.trim() ? categoryName : "TODO";

  const response = await axios.get(
    `${API_BASE}/products/v1/categories?categoryName=${name}&limit=${limit}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
};

export const updateSection = async (section: Section, token: string) => {
  const response = await axios.post(
    `${API_BASE}/products/v1/categories`,
    section,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const deleteSection = async (id: number | string, token: string) => {
  const response = await axios.delete(
    `${API_BASE}/products/v1/categories/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

// Brands API

export const listBrands = async (token: string) => {
  const response = await axios.get(`${API_BASE}/master/v1/brands`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
