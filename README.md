# mpesa-sdk

![NPM version](https://img.shields.io/npm/v/mpesa-sdk.svg)
![License](https://img.shields.io/github/license/nielsero/mpesa-sdk)

Type safe SDK for [M-Pesa API (Mozambique)](https://developer.mpesa.vm.co.mz/)

## Features

- [x] C2B Payment
- [x] B2C Payment
- [x] B2B Payment
- [x] Query Transaction Status
- [x] Query Customer Name
- [x] Reversal

## Installation

```sh
npm install mpesa-sdk
```

## Usage

### Configuration

```ts
import mpesa from "mpesa-sdk";

mpesa.configure({
  mode: "sandbox",
  apiKey: <YOUR_API_KEY>,
  publicKey: <YOUR_PUBLIC_KEY>,
  origin: "developer.mpesa.vm.co.mz",
  serviceProviderCode: "171717",
});
```

> **Note:** For security reasons, it is a best practice to store sensitive information such as `apiKey` and `publicKey` in environment variables rather than hardcoding them directly in your code.

### C2B Payment

```ts
const data = await mpesa.c2bPayment({
  amount: 10,
  msisdn: "258843330333",
  transactionReference: "T12344C",
  thirdPartyReference: "11114",
});

console.log(data);
```

### B2C Payment

```ts
const data = await mpesa.b2cPayment({
  amount: 10,
  msisdn: "258843330333",
  transactionReference: "T12344C",
  thirdPartyReference: "11114",
});

console.log(data);
```

### B2B Payment

```ts
const data = await mpesa.b2bPayment({
  amount: 10,
  receiverPartyCode: "979797",
  transactionReference: "T12344C",
  thirdPartyReference: "11114",
});

console.log(data);
```

### Query Transaction Status

```ts
const data = await mpesa.queryTransactionStatus({
  queryReference: "5C1400CVRO",
  thirdPartyReference: "11114",
});

console.log(data);
```

### Query Customer Name

```ts
const data = await mpesa.queryCustomerName({
  msisdn: "258843330333",
  thirdPartyReference: "11114",
});

console.log(data);
```

### Reversal

```ts
const data = await mpesa.reversal({
  transactionId: "49XCDF6",
  securityCredential: "Mpesa2019",
  initiatorIdentifier: "MPesa2018",
  thirdPartyReference: "11114",
  reversalAmount: "10",
});

console.log(data);
```

## License

This project is licensed under the [MIT License](LICENSE) - see the [LICENSE](LICENSE) file for
details.

## Acknowledgments

Inspired by [mpesa-node-api](https://github.com/thatfiredev/mpesa-node-api) and [mpesa-mz-nodejs-lib](https://github.com/ivanruby/mpesa-mz-nodejs-lib)
