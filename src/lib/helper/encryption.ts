import crypto from "crypto";

const SECRET = process.env.ENCRYPTION_SECRET || process.env.JWT_SECRET || "blogit-secure-encryption-secret-key";
// Derive a 32-byte key using scrypt
const KEY = crypto.scryptSync(SECRET, "blogit-salt", 32);
const ALGORITHM = "aes-256-gcm";

/**
 * Encrypts a plaintext token string using AES-256-GCM.
 * Output format: `iv_hex:authTag_hex:encrypted_hex`
 */
export function encryptToken(text: string): string {
  if (!text || !text.trim()) return "";

  const iv = crypto.randomBytes(12); // 96-bit IV for AES-GCM
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag().toString("hex");
  const ivHex = iv.toString("hex");

  return `${ivHex}:${authTag}:${encrypted}`;
}

/**
 * Decrypts an AES-256-GCM encrypted token string.
 * Gracefully handles legacy unencrypted tokens if present.
 */
export function decryptToken(encryptedText: string): string {
  if (!encryptedText || !encryptedText.trim()) return "";

  // Check if string matches `iv:authTag:ciphertext` format
  const parts = encryptedText.split(":");
  if (parts.length !== 3) {
    // Legacy unencrypted token fallback
    return encryptedText;
  }

  try {
    const [ivHex, authTagHex, encryptedData] = parts;
    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");

    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (error) {
    console.warn("Decryption failed or token was not encrypted, returning string as-is:", error);
    return encryptedText;
  }
}
