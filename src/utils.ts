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
    console.error(error);
    return null;
  }
}
