export const getApiUrl = (endpoint: string) => {
  const url = process.env.NEXT_APP_URL || "http://localhost:3000";
  return url + endpoint;
};
