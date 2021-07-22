export type SocialAuthProvider = 'yandex';

export interface SocialAuthState {
  provider: SocialAuthProvider;
  token: string;
}

export interface UserAuthState {
  socialAuthState: SocialAuthState | null;
}
