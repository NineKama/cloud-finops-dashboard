import axios from "axios";

const BASE_URL = "http://localhost:8000";

export const fetchDailyCosts = async () => {
  const res = await axios.get(`${BASE_URL}/costs`);
  return res.data.data; 
};

export const fetchCostsByService = async () => {
  const res = await axios.get(`${BASE_URL}/costs/by-service`);
  return res.data.data;
};

import { RegionCost } from "../types";

export const fetchCostsByRegion = async (): Promise<RegionCost[]> => {
  const res = await axios.get(`${BASE_URL}/costs/by-region`);
  return res.data.data;
};
