import { cookies } from "next/headers";

export function validateCsrf(request: Request) {
  const cookieToken = cookies().get("csrf_token")?.value;
  const headerToken = request.headers.get("x-csrf-token") || request.headers.get("csrf-token");

  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    return false;
  }

  return true;
}
