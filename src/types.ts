export type Configuration = {
  mode: "sandbox" | "production";
  apiKey: string | null;
  publicKey: string | null;
  origin: string | null;
  serviceProviderCode: string | null;
};

export type C2BRequest = {
  input_TransactionReference: string;
  input_CustomerMSISDN: string;
  input_Amount: string;
  input_ThirdPartyReference: string;
  input_ServiceProviderCode: string;
};

export type C2BResponse =
  | {
      output_ConversationID: string;
      output_TransactionID: string;
      output_ResponseDesc: string;
      output_ResponseCode: string;
      output_ThirdPartyReference: string;
    }
  | { output_error: string };

export type QueryTransactionStatusRequest = {
  input_ThirdPartyReference: string;
  input_QueryReference: string;
  input_ServiceProviderCode: string;
};

export type QueryTransactionStatusResponse =
  | {
      output_ConversationID: string;
      output_ResponseDesc: string;
      output_ResponseCode: string;
      output_ThirdPartyReference: string;
      output_ResponseTransactionStatus: string;
    }
  | { output_error: string };

export type B2CRequest = {
  input_TransactionReference: string;
  input_CustomerMSISDN: string;
  input_Amount: string;
  input_ThirdPartyReference: string;
  input_ServiceProviderCode: string;
};

export type B2CResponse =
  | {
      output_ConversationID: string;
      output_TransactionID: string;
      output_ResponseDesc: string;
      output_ResponseCode: string;
      output_ThirdPartyReference: string;
    }
  | { output_error: string };

export type ReversalRequest = {
  input_TransactionID: string;
  input_SecurityCredential: string;
  input_InitiatorIdentifier: string;
  input_ThirdPartyReference: string;
  input_ServiceProviderCode: string;
  input_ReversalAmount?: string;
};

export type ReversalResponse =
  | {
      output_ConversationID: string;
      output_TransactionID: string;
      output_ResponseDesc: string;
      output_ResponseCode: string;
      output_ThirdPartyReference: string;
    }
  | { output_error: string };
