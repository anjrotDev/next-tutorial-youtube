export const authHeaders = (token?: string) => {
  return {
    "Content-Type": "application/json",
    Authorization: `${token}`
  };
};
