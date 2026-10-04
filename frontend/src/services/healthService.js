import api, {
  SERVER_BASE_URL,
} from "./api";

export const checkBackendHealth = async () => {

  const response = await api.get(
    `${SERVER_BASE_URL}/health`
  );

  return response.data;
};