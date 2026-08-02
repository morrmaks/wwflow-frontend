interface TokenPayload {
  id: string;
  email: string;
}

class TokenGenerator {
  private static readonly ACCESS_SECRET = 'mock-access-token-secret-key';
  private static readonly REFRESH_SECRET = 'mock-refresh-token-secret-key';

  private static base64UrlEncode(obj: unknown): string {
    return Buffer.from(JSON.stringify(obj)).toString('base64url');
  }

  private static base64UrlDecode<T>(str: string): T {
    return JSON.parse(Buffer.from(str, 'base64url').toString());
  }

  static createAccessToken(user: TokenPayload): string {
    const header = {
      alg: 'MOCK',
      typ: 'JWT',
      exp: Math.floor(Date.now() / 1000) + 60 * 15
    };

    return [
      this.base64UrlEncode(header),
      this.base64UrlEncode(user),
      this.base64UrlEncode(this.ACCESS_SECRET)
    ].join('.');
  }

  static createRefreshToken(user: TokenPayload): string {
    const header = {
      alg: 'MOCK',
      typ: 'JWT',
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
    };

    return [
      this.base64UrlEncode(header),
      this.base64UrlEncode(user),
      this.base64UrlEncode(this.REFRESH_SECRET)
    ].join('.');
  }

  static validateAccessToken(token?: string): TokenPayload | null {
    return this.validate(token, this.ACCESS_SECRET);
  }

  static validateRefreshToken(token?: string): TokenPayload | null {
    return this.validate(token, this.REFRESH_SECRET);
  }

  private static validate(token: string | undefined, secret: string) {
    if (!token) return null;

    try {
      const [encodedHeader, encodedPayload, encodedSignature] = token.split('.');
      if (!encodedHeader || !encodedPayload || !encodedSignature) return null;

      const header = this.base64UrlDecode<{ exp: number }>(encodedHeader);
      const payload = this.base64UrlDecode<TokenPayload>(encodedPayload);
      const signature = this.base64UrlDecode<string>(encodedSignature);

      if (signature !== secret) return null;
      if (header.exp < Math.floor(Date.now() / 1000)) return null;

      return payload;
    } catch {
      return null;
    }
  }
}

export { TokenGenerator };