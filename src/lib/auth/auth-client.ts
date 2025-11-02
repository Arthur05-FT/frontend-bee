import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:
    process.env.BACKEND_URL + "/api/auth" || "http://localhost:3000/api/auth",
});

export const { signIn, signOut, useSession } = authClient;
