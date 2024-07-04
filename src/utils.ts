import crypto from "crypto";

export function getBearerToken(
  apiKey: string,
  publicKey: string
): string | null {
  try {
    const publicKeyBuffer = Buffer.from(publicKey, "base64");
    const pk = crypto.createPublicKey({
      key: publicKeyBuffer,
      format: "der", // Specify the format explicitly
      type: "spki", // Specify the type explicitly
    });

    const encryptedApiKeyBuffer = crypto.publicEncrypt(
      { key: pk, padding: crypto.constants.RSA_PKCS1_PADDING },
      Buffer.from(apiKey, "utf-8")
    );
    return encryptedApiKeyBuffer.toString("base64");
  } catch (error) {
    return null;
  }
}

export function getApiBaseUrl(mode: string): string {
  const urlSandbox = "https://api.sandbox.vm.co.mz";
  const urlProduction = "https://api.vm.co.mz";

  return mode === "production" ? `${urlProduction}` : `${urlSandbox}`;
}
