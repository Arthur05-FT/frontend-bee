import { authClient } from "./auth-client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface VerifyOtpParams {
  otp: string;
  email: string;
  router: AppRouterInstance;
  setIsVerifying: (value: boolean) => void;
  setError: (value: string) => void;
  setOtp: (value: string) => void;
}

export async function verifyOtp({
  otp,
  email,
  router,
  setIsVerifying,
  setError,
  setOtp,
}: VerifyOtpParams): Promise<void> {
  setIsVerifying(true);
  setError("");

  try {
    await authClient.signIn.emailVerification({
      email,
      token: otp,
    });

    sessionStorage.removeItem("pending_verification_email");
    router.push("/dashboard");
  } catch (err: any) {
    console.error("Erreur lors de la vérification de l'OTP:", err);
    setError(err.message || "Code invalide. Veuillez réessayer.");
    setOtp("");
  } finally {
    setIsVerifying(false);
  }
}
