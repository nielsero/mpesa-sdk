import { Configuration } from "./types";

const urlSandbox = "https://api.sandbox.vm.co.mz";
const urlProduction = "https://api.vm.co.mz";

const configuration: Configuration = {
  mode: "sandbox",
  apiKey: null,
  publicKey: null,
  origin: null,
  serviceProviderCode: null,
};

export function checkConfiguration(): Configuration {
  return Object.assign({}, configuration);
}

export function testing() {
  console.log("Testing");
  const newConfig = checkConfiguration();
  newConfig.mode = "production";
  console.log("config", configuration);
  console.log("newConfig", newConfig);
}
