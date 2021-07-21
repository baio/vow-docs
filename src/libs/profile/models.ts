export type AuthProvider = 'yandex';

export interface SocialAuthState {
  provider: AuthProvider;
  token: string;
}

export interface UserAuthState {
  socialAuthState: SocialAuthState | null;
}
