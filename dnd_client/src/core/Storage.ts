import { ApiSchemaProfileData } from "../models";

class AppLocalStorageManager {
  private readonly KeyAccessToken = 'accessToken';
  private readonly KeyProfile = 'userProfile';

  private _setItem(key: string, data: string | null): void {
    if (data) {
      window.localStorage.setItem(key, data);
    } else {
      window.localStorage.removeItem(key);
    }
  }

  private _getItem(key: string): string | null {
    return window.localStorage.getItem(key);
  }

  set AccessToken(token: string | null) {
    this._setItem(this.KeyAccessToken, token);
  }
  get AccessToken(): string | null {
    return this._getItem(this.KeyAccessToken);
  }

  set Profile(profile: ApiSchemaProfileData | undefined) {
    this._setItem(this.KeyProfile, !!profile ? JSON.stringify(profile) : null);
  }
  get Profile(): ApiSchemaProfileData | undefined {
    const profile = this._getItem(this.KeyProfile);
    if (!profile) return undefined;
    return JSON.parse(profile);
  }

  ClearAuth(): void {
    window.localStorage.removeItem(this.KeyAccessToken);
    window.localStorage.removeItem(this.KeyProfile);
  }
}

export const AppLocalStorage = new AppLocalStorageManager();