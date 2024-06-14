export const getApiUrl = (endpoint: string) => {
  const url = process.env.NEXT_APP_URL || "https://sociology-game.sohel.tech";
  return url + endpoint;
};
