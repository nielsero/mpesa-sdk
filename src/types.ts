export type Configuration = {
  mode: "sandbox" | "production";
  apiKey: string | null;
  publicKey: string | null;
  origin: string | null;
  serviceProviderCode: number | null;
};
