import axios from "axios";
import {
  B2BRequest,
  B2BResponse,
  B2CRequest,
  B2CResponse,
  C2BRequest,
  C2BResponse,
  Configuration,
  ErrorResponse,
  QueryCustomerNameRequest,
  QueryCustomerNameResponse,
  QueryTransactionStatusResponse,
  ReversalRequest,
  ReversalResponse,
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
    });

    return data;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data as C2BResponse | ErrorResponse;
    }

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
    });

    return data;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data as
        | QueryTransactionStatusResponse
        | ErrorResponse;
    }

    throw new Error("API error");
  }
}

export async function b2cPayment(request: {
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

  const url = `${getUrl(configuration.mode)}:18345/ipg/v1x/b2cPayment/`;

  const token = await getBearerToken(
    configuration.apiKey,
    configuration.publicKey
  );

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Origin: configuration.origin,
  };

  const body: B2CRequest = {
    input_TransactionReference: request.transactionReference,
    input_CustomerMSISDN: request.msisdn,
    input_Amount: request.amount + "",
    input_ThirdPartyReference: request.thirdPartyReference,
    input_ServiceProviderCode: configuration.serviceProviderCode,
  };

  try {
    const { data } = await axios.request<B2CResponse>({
      method: "POST",
      url,
      headers,
      data: body,
      timeout: 120000,
    });

    return data;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data as B2CResponse | ErrorResponse;
    }

    throw new Error("API error");
  }
}

export async function reversal(request: {
  transactionId: string;
  securityCredential: string;
  initiatorIdentifier: string;
  thirdPartyReference: string;
  reversalAmount?: number;
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

  const url = `${getUrl(configuration.mode)}:18354/ipg/v1x/reversal/`;

  const token = await getBearerToken(
    configuration.apiKey,
    configuration.publicKey
  );

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Origin: configuration.origin,
  };

  const body: ReversalRequest = {
    input_TransactionID: request.transactionId,
    input_SecurityCredential: request.securityCredential,
    input_InitiatorIdentifier: request.initiatorIdentifier,
    input_ThirdPartyReference: request.thirdPartyReference,
    input_ServiceProviderCode: configuration.serviceProviderCode,
    input_ReversalAmount: request.reversalAmount
      ? request.reversalAmount + ""
      : undefined,
  };

  try {
    const { data } = await axios.request<ReversalResponse>({
      method: "PUT",
      url,
      headers,
      data: body,
    });

    return data;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data as ReversalResponse | ErrorResponse;
    }

    throw new Error("API error");
  }
}

export async function b2bPayment(request: {
  amount: number;
  transactionReference: string;
  thirdPartyReference: string;
  receiverPartyCode: string;
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

  const url = `${getUrl(configuration.mode)}:18349/ipg/v1x/b2bPayment/`;

  const token = await getBearerToken(
    configuration.apiKey,
    configuration.publicKey
  );

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Origin: configuration.origin,
  };

  const body: B2BRequest = {
    input_TransactionReference: request.transactionReference,
    input_Amount: request.amount + "",
    input_ThirdPartyReference: request.thirdPartyReference,
    input_PrimaryPartyCode: configuration.serviceProviderCode,
    input_ReceiverPartyCode: request.receiverPartyCode,
  };

  try {
    const { data } = await axios.request<B2BResponse>({
      method: "POST",
      url,
      headers,
      data: body,
    });

    return data;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data as B2BResponse | ErrorResponse;
    }

    throw new Error("API error");
  }
}

export async function queryCustomerName(request: {
  msisdn: string;
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

  const url = `${getUrl(configuration.mode)}:19323/ipg/v1x/queryCustomerName/`;

  const token = await getBearerToken(
    configuration.apiKey,
    configuration.publicKey
  );

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Origin: configuration.origin,
  };

  const body: QueryCustomerNameRequest = {
    input_CustomerMSISDN: request.msisdn,
    input_ThirdPartyReference: request.thirdPartyReference,
    input_ServiceProviderCode: configuration.serviceProviderCode,
  };

  try {
    const { data } = await axios.request<QueryCustomerNameResponse>({
      method: "GET",
      url,
      headers,
      params: body,
    });

    return data;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data as QueryCustomerNameResponse | ErrorResponse;
    }

    throw new Error("API error");
  }
}
