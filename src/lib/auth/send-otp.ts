import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { authClient } from "./auth-client";

interface SendOtpParams {
  email: string;
  setError: (value: string) => void;
  router: AppRouterInstance;
}

export async function sendOTP({ email, setError, router }: SendOtpParams) {
  try {
    setError("");
    await authClient.signIn.email({
      email,
      callbackURL: "/dashboard",
    });
    sessionStorage.setItem("pending_verification_email", email);
    router.push("/auth/access");
  } catch (err: any) {
    console.error("Erreur lors de l'envoi de l'OTP:", err);
    setError(err.message || "Une erreur est survenue. Veuillez réessayer.");
  }
}
