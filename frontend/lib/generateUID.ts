export function generateRandomUID(): string {
  // Generate a random 6-digit integer using the current timestamp
  const timestamp = Date.now();
  const randomPart = Math.floor(100000 + Math.random() * 900000).toString();

  // Combine and ensure only 6 digits by taking the last 6 characters
  const uid = (timestamp.toString() + randomPart).slice(-6);

  // Return the 6-digit UID as a string
  return uid;
}
