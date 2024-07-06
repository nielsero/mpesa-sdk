import MPesa, { Configuration } from "../src/index";

describe("Configuration", () => {
  it("should correctly assign configuration values", () => {
    const mpesa = new MPesa({
      apiKey: "test-api-key",
      publicKey: "test-public-key",
      origin: "test.com",
      serviceProviderCode: "171717",
    });

    const expectedConfiguration: Configuration = {
      mode: "sandbox",
      apiKey: "test-api-key",
      publicKey: "test-public-key",
      origin: "test.com",
      serviceProviderCode: "171717",
    };

    expect(mpesa.getConfiguration()).toEqual(expectedConfiguration);
  });

  it("should correctly update configuration values", () => {
    const mpesa = new MPesa({
      apiKey: "test-api-key",
      publicKey: "test-public-key",
      origin: "test.com",
      serviceProviderCode: "171717",
    });

    mpesa.updateConfiguration({
      mode: "production",
      apiKey: "new-api-key",
      publicKey: "new-public-key",
      origin: "new.com",
      serviceProviderCode: "181818",
    });

    const expectedConfiguration: Configuration = {
      mode: "production",
      apiKey: "new-api-key",
      publicKey: "new-public-key",
      origin: "new.com",
      serviceProviderCode: "181818",
    };

    expect(mpesa.getConfiguration()).toEqual(expectedConfiguration);
  });
});
