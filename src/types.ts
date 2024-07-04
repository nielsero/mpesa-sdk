export type Configuration = {
  mode: "sandbox" | "production";
  apiKey: string;
  publicKey: string;
  origin: string;
  serviceProviderCode: string;
};

export type ErrorResponse = {
  output_error: string;
};

export type C2BRequest = {
  input_TransactionReference: string;
  input_CustomerMSISDN: string;
  input_Amount: string;
  input_ThirdPartyReference: string;
  input_ServiceProviderCode: string;
};

export type C2BResponse = {
  output_ConversationID: string;
  output_TransactionID: string;
  output_ResponseDesc: string;
  output_ResponseCode: string;
  output_ThirdPartyReference: string;
};

export type QueryTransactionStatusRequest = {
  input_ThirdPartyReference: string;
  input_QueryReference: string;
  input_ServiceProviderCode: string;
};

export type QueryTransactionStatusResponse = {
  output_ConversationID: string;
  output_ResponseDesc: string;
  output_ResponseCode: string;
  output_ThirdPartyReference: string;
  output_ResponseTransactionStatus: string;
};

export type B2CRequest = {
  input_TransactionReference: string;
  input_CustomerMSISDN: string;
  input_Amount: string;
  input_ThirdPartyReference: string;
  input_ServiceProviderCode: string;
};

export type B2CResponse = {
  output_ConversationID: string;
  output_TransactionID: string;
  output_ResponseDesc: string;
  output_ResponseCode: string;
  output_ThirdPartyReference: string;
};

export type ReversalRequest = {
  input_TransactionID: string;
  input_SecurityCredential: string;
  input_InitiatorIdentifier: string;
  input_ThirdPartyReference: string;
  input_ServiceProviderCode: string;
  input_ReversalAmount?: string;
};

export type ReversalResponse = {
  output_ConversationID: string;
  output_TransactionID: string;
  output_ResponseDesc: string;
  output_ResponseCode: string;
  output_ThirdPartyReference: string;
};

export type B2BRequest = {
  input_TransactionReference: string;
  input_Amount: string;
  input_ThirdPartyReference: string;
  input_PrimaryPartyCode: string;
  input_ReceiverPartyCode: string;
};

export type B2BResponse = {
  output_ConversationID: string;
  output_TransactionID: string;
  output_ResponseDesc: string;
  output_ResponseCode: string;
  output_ThirdPartyReference: string;
};

export type QueryCustomerNameRequest = {
  input_CustomerMSISDN: string;
  input_ThirdPartyReference: string;
  input_ServiceProviderCode: string;
};

export type QueryCustomerNameResponse = {
  output_ConversationID: string;
  output_ResultDesc: string;
  output_ResultCode: string;
  output_ThirdPartyReference: string;
  output_CustomerName: string;
};
