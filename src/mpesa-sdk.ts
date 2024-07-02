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

export function configure(config: {
  mode?: "sandbox" | "production";
  apiKey?: string;
  publicKey?: string;
  origin?: string;
  serviceProviderCode?: number;
}) {
  configuration.mode = config.mode || configuration.mode;
  configuration.apiKey = config.apiKey || configuration.apiKey;
  configuration.publicKey = config.publicKey || configuration.publicKey;
  configuration.origin = config.origin || configuration.origin;
  configuration.serviceProviderCode =
    config.serviceProviderCode || configuration.serviceProviderCode;
}

function testing() {
  console.log("testing");
  configure({ mode: "production", apiKey: "1234" });
  console.log("config", checkConfiguration());
}

testing();
