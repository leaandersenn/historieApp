import {
  signIn as amplifySignIn,
  confirmSignIn,
  getCurrentUser,
  fetchAuthSession,
  signOut as amplifySignOut,
  resetPassword,
  confirmResetPassword,
  type SignInOutput,
} from 'aws-amplify/auth';

export async function signInEmailPassword(email: string, password: string): Promise<SignInOutput> {
  return amplifySignIn({ username: email.trim(), password });
}

export async function confirmMfa(code: string) {
  return confirmSignIn({ challengeResponse: code.trim() });
}

export async function confirmNewPassword(newPassword: string) {
  return confirmSignIn({ challengeResponse: newPassword });
}

export async function getUserAndSession() {
  const user = await getCurrentUser();
  const session = await fetchAuthSession();
  return { user, session };
}

export async function signOut(global = true) {
  return amplifySignOut({ global });
}

export async function startPasswordReset(email: string) {
  return resetPassword({ username: email.trim() });
}

export async function finishPasswordReset(email: string, code: string, newPassword: string) {
  return confirmResetPassword({ username: email.trim(), confirmationCode: code.trim(), newPassword });
}
