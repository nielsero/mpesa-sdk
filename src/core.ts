import axios, { AxiosError } from "axios";
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
import { getBearerToken, getApiBaseUrl } from "./utils";
import { MpesaResponseError } from "./error";

export class MPesa {
  private configuration: Configuration;

  constructor(config: {
    mode?: "sandbox" | "production";
    apiKey: string;
    publicKey: string;
    origin: string;
    serviceProviderCode: string;
  }) {
    this.configuration = {
      mode: config.mode ?? "sandbox",
      apiKey: config.apiKey,
      publicKey: config.publicKey,
      origin: config.origin,
      serviceProviderCode: config.serviceProviderCode,
    };
  }

  getConfiguration() {
    return Object.assign({}, this.configuration);
  }

  updateConfiguration(config: {
    mode?: "sandbox" | "production";
    apiKey?: string;
    publicKey?: string;
    origin?: string;
    serviceProviderCode?: string;
  }) {
    this.configuration.mode = config.mode ?? this.configuration.mode;
    this.configuration.apiKey = config.apiKey ?? this.configuration.apiKey;
    this.configuration.publicKey =
      config.publicKey ?? this.configuration.publicKey;
    this.configuration.origin = config.origin ?? this.configuration.origin;
    this.configuration.serviceProviderCode =
      config.serviceProviderCode ?? this.configuration.serviceProviderCode;
  }

  async c2bPayment(request: {
    amount: number;
    msisdn: string;
    transactionReference: string;
    thirdPartyReference: string;
  }) {
    const url = `${getApiBaseUrl(
      this.configuration.mode
    )}:18352/ipg/v1x/c2bPayment/singleStage/`;

    const token = await getBearerToken(
      this.configuration.apiKey,
      this.configuration.publicKey
    );

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Origin: this.configuration.origin,
    };

    const body: C2BRequest = {
      input_TransactionReference: request.transactionReference,
      input_CustomerMSISDN: request.msisdn,
      input_Amount: request.amount + "",
      input_ThirdPartyReference: request.thirdPartyReference,
      input_ServiceProviderCode: this.configuration.serviceProviderCode,
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
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status && error.response.status < 500) {
          return error.response.data as C2BResponse;
        }

        const message = error.message;
        const statusCode = error.response?.status ?? 500;
        const data = error.response?.data as ErrorResponse;
        throw new MpesaResponseError(message, statusCode, data);
      }

      throw new Error("API error");
    }
  }

  async b2cPayment(request: {
    amount: number;
    msisdn: string;
    transactionReference: string;
    thirdPartyReference: string;
  }) {
    const url = `${getApiBaseUrl(
      this.configuration.mode
    )}:18345/ipg/v1x/b2cPayment/`;

    const token = await getBearerToken(
      this.configuration.apiKey,
      this.configuration.publicKey
    );

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Origin: this.configuration.origin,
    };

    const body: B2CRequest = {
      input_TransactionReference: request.transactionReference,
      input_CustomerMSISDN: request.msisdn,
      input_Amount: request.amount + "",
      input_ThirdPartyReference: request.thirdPartyReference,
      input_ServiceProviderCode: this.configuration.serviceProviderCode,
    };

    try {
      const { data } = await axios.request<B2CResponse>({
        method: "POST",
        url,
        headers,
        data: body,
      });

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status && error.response.status < 500) {
          return error.response.data as B2CResponse;
        }

        const message = error.message;
        const statusCode = error.response?.status ?? 500;
        const data = error.response?.data as ErrorResponse;
        throw new MpesaResponseError(message, statusCode, data);
      }

      throw new Error("API error");
    }
  }

  async b2bPayment(request: {
    amount: number;
    receiverPartyCode: string;
    transactionReference: string;
    thirdPartyReference: string;
  }) {
    const url = `${getApiBaseUrl(
      this.configuration.mode
    )}:18349/ipg/v1x/b2bPayment/`;

    const token = await getBearerToken(
      this.configuration.apiKey,
      this.configuration.publicKey
    );

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Origin: this.configuration.origin,
    };

    const body: B2BRequest = {
      input_TransactionReference: request.transactionReference,
      input_Amount: request.amount + "",
      input_ThirdPartyReference: request.thirdPartyReference,
      input_PrimaryPartyCode: this.configuration.serviceProviderCode,
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
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status && error.response.status < 500) {
          return error.response.data as B2BResponse;
        }

        const message = error.message;
        const statusCode = error.response?.status ?? 500;
        const data = error.response?.data as ErrorResponse;
        throw new MpesaResponseError(message, statusCode, data);
      }

      throw new Error("API error");
    }
  }

  async queryTransactionStatus(request: {
    queryReference: string;
    thirdPartyReference: string;
  }) {
    const url = `${getApiBaseUrl(
      this.configuration.mode
    )}:18353/ipg/v1x/queryTransactionStatus/`;

    const token = await getBearerToken(
      this.configuration.apiKey,
      this.configuration.publicKey
    );

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Origin: this.configuration.origin,
    };

    const body = {
      input_ThirdPartyReference: request.thirdPartyReference,
      input_QueryReference: request.queryReference,
      input_ServiceProviderCode: this.configuration.serviceProviderCode,
    };

    try {
      const { data } = await axios.request<QueryTransactionStatusResponse>({
        method: "GET",
        url,
        headers,
        params: body,
      });

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status && error.response.status < 500) {
          return error.response.data as QueryTransactionStatusResponse;
        }

        const message = error.message;
        const statusCode = error.response?.status ?? 500;
        const data = error.response?.data as ErrorResponse;
        throw new MpesaResponseError(message, statusCode, data);
      }

      throw new Error("API error");
    }
  }

  async queryCustomerName(request: {
    msisdn: string;
    thirdPartyReference: string;
  }) {
    const url = `${getApiBaseUrl(
      this.configuration.mode
    )}:19323/ipg/v1x/queryCustomerName/`;

    const token = await getBearerToken(
      this.configuration.apiKey,
      this.configuration.publicKey
    );

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Origin: this.configuration.origin,
    };

    const body: QueryCustomerNameRequest = {
      input_CustomerMSISDN: request.msisdn,
      input_ThirdPartyReference: request.thirdPartyReference,
      input_ServiceProviderCode: this.configuration.serviceProviderCode,
    };

    try {
      const { data } = await axios.request<QueryCustomerNameResponse>({
        method: "GET",
        url,
        headers,
        params: body,
      });

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status && error.response.status < 500) {
          return error.response.data as QueryCustomerNameResponse;
        }

        const message = error.message;
        const statusCode = error.response?.status ?? 500;
        const data = error.response?.data as ErrorResponse;
        throw new MpesaResponseError(message, statusCode, data);
      }

      throw new Error("API error");
    }
  }

  async reversal(request: {
    transactionId: string;
    securityCredential: string;
    initiatorIdentifier: string;
    thirdPartyReference: string;
    reversalAmount?: number;
  }) {
    const url = `${getApiBaseUrl(
      this.configuration.mode
    )}:18354/ipg/v1x/reversal/`;

    const token = await getBearerToken(
      this.configuration.apiKey,
      this.configuration.publicKey
    );

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Origin: this.configuration.origin,
    };

    const body: ReversalRequest = {
      input_TransactionID: request.transactionId,
      input_SecurityCredential: request.securityCredential,
      input_InitiatorIdentifier: request.initiatorIdentifier,
      input_ThirdPartyReference: request.thirdPartyReference,
      input_ServiceProviderCode: this.configuration.serviceProviderCode,
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
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status && error.response.status < 500) {
          return error.response.data as ReversalResponse;
        }

        const message = error.message;
        const statusCode = error.response?.status ?? 500;
        const data = error.response?.data as ErrorResponse;
        throw new MpesaResponseError(message, statusCode, data);
      }

      throw new Error("API error");
    }
  }
}
