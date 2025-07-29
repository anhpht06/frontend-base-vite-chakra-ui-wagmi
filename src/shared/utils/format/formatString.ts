export const getAddressFormat = (address: string | undefined, end?: number) => {
  if (!address) return "";
  const frontText = address.slice(0, end ?? 4);
  const endText = address.slice(-(end ?? 4));
  return `${frontText}...${endText}`;
};
