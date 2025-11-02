import { authClient } from "./auth-client";

interface ResendOtpParams {
  email: string;
  setIsResending: (value: boolean) => void;
  setError: (value: string) => void;
  setCanResend: (value: boolean) => void;
}

export async function handleResendOtp({
  email,
  setIsResending,
  setError,
  setCanResend,
}: ResendOtpParams) {
  setIsResending(true);
  setError("");
  setCanResend(false);
  try {
    await authClient.signIn.email({
      email: email,
      callbackURL: "/dashboard",
    });
  } catch (err: any) {
    console.error("Erreur lors du renvoi de l'OTP:", err);
    setError(err.message || "Erreur lors du renvoi du code.");
    setCanResend(true);
  } finally {
    setIsResending(false);
  }
}
