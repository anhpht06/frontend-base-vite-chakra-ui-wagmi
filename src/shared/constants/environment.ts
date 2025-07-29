function getEnvVar(name: string): string {
  const value = import.meta.env[name];
  if (!value) {
    throw new Error(`Missing environment variable`);
  }
  return value;
}

export const apiUrl = getEnvVar("VITE_API_URL");
export const projectId = getEnvVar("VITE_PROJECT_ID");
export const signMessage = getEnvVar("VITE_SIGN_MESSAGE");
