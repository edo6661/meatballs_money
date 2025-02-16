"use server";
import { isRedirectError } from "next/dist/client/components/redirect-error";

/**
 * Menangani error di dalam server action dengan mengatur flash message.
 *
 * @param err - Error yang ditangkap.
 * @param cookieKey - Nama cookie untuk menyimpan error (misalnya "error" atau "login_error").
 * @param path - Path cookie (misalnya "/auth/register" atau "/auth/login").
 * @param defaultMessage - Pesan default yang akan disimpan sebagai form error.
 */
export async function handleActionError(
  err: unknown,
  cookieKey: string,
  path: string,
  defaultMessage: string = "Terjadi kesalahan"
): Promise<void> {
  if (isRedirectError(err)) {
    throw err;
  }
  console.log("defaultMessage", defaultMessage);
  console.error(err);
}
