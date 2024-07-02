import axios from "axios";
import {
  C2BRequest,
  C2BResponse,
  Configuration,
  QueryTransactionStatusResponse,
} from "./types";
import { getBearerToken, getUrl } from "./utils";

const configuration: Configuration = {
  mode: "sandbox",
  apiKey: null,
  publicKey: null,
  origin: null,
  serviceProviderCode: null,
};

export function getConfiguration(): Configuration {
  return Object.assign({}, configuration);
}

export function configure(config: {
  mode?: "sandbox" | "production";
  apiKey?: string;
  publicKey?: string;
  origin?: string;
  serviceProviderCode?: string;
}) {
  configuration.mode = config.mode || configuration.mode;
  configuration.apiKey = config.apiKey || configuration.apiKey;
  configuration.publicKey = config.publicKey || configuration.publicKey;
  configuration.origin = config.origin || configuration.origin;
  configuration.serviceProviderCode =
    config.serviceProviderCode || configuration.serviceProviderCode;
}

export async function c2bPayment(request: {
  amount: number;
  msisdn: string;
  transactionReference: string;
  thirdPartyReference: string;
}) {
  if (
    !configuration.mode ||
    !configuration.apiKey ||
    !configuration.publicKey ||
    !configuration.origin ||
    !configuration.serviceProviderCode
  ) {
    throw new Error("Configuration error");
  }

  const url = `${getUrl(
    configuration.mode
  )}:18352/ipg/v1x/c2bPayment/singleStage/`;

  const token = await getBearerToken(
    configuration.apiKey,
    configuration.publicKey
  );

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Origin: configuration.origin,
  };

  const body: C2BRequest = {
    input_TransactionReference: request.transactionReference,
    input_CustomerMSISDN: request.msisdn,
    input_Amount: request.amount + "",
    input_ThirdPartyReference: request.thirdPartyReference,
    input_ServiceProviderCode: configuration.serviceProviderCode,
  };

  try {
    const { data } = await axios.request<C2BResponse>({
      method: "POST",
      url,
      headers,
      data: body,
      timeout: 120000,
      validateStatus: (status) => status >= 200 && status < 500,
    });

    return data;
  } catch (error) {
    throw new Error("API error");
  }
}

export async function queryTransactionStatus(request: {
  thirdPartyReference: string;
  queryReference: string;
}) {
  if (
    !configuration.mode ||
    !configuration.apiKey ||
    !configuration.publicKey ||
    !configuration.origin ||
    !configuration.serviceProviderCode
  ) {
    throw new Error("Configuration error");
  }

  const url = `${getUrl(
    configuration.mode
  )}:18353/ipg/v1x/queryTransactionStatus/`;

  const token = await getBearerToken(
    configuration.apiKey,
    configuration.publicKey
  );

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Origin: configuration.origin,
  };

  const body = {
    input_ThirdPartyReference: request.thirdPartyReference,
    input_QueryReference: request.queryReference,
    input_ServiceProviderCode: configuration.serviceProviderCode,
  };

  try {
    const { data } = await axios.request<QueryTransactionStatusResponse>({
      method: "GET",
      url,
      headers,
      params: body,
      validateStatus: (status) => status >= 200 && status < 500,
    });

    return data;
  } catch (error) {
    throw new Error("API error");
  }
}
