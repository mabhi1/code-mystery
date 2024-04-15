"use server";

export async function matchPassword(passwordFieldValue: string, password: string, final: boolean) {
  if (!final) return password === process.env.SUBMIT_PASSWORD_KEY;
  else return passwordFieldValue === process.env.SUBMIT_PASSWORD_KEY?.toUpperCase();
}
