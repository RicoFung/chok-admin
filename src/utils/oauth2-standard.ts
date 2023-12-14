import axios from "axios";

/*
 *******************************************************************************
 * 授权码模式（基本）
 *******************************************************************************
 */
export const clientConfig = {
  clientId: "rico-client",
  clientSecret: "123", // 注意：在前端代码中暴露 clientSecret 是不安全的，通常这应该在服务器端处理。
  scopes: ["openid", "test.read"],
  grantType: "authorization_code",
  redirectUri: "https://client-server:8848/oauth2callback-standard",
  authServerUrl: "http://auth-server:9000",
  tokenEndpoint: "/oauth2-server/oauth2/token"
};

export function buildOAuth2Url(): string {
  const { clientId, clientSecret, redirectUri, authServerUrl, scopes } =
    clientConfig;
  const scopeString = encodeURIComponent(scopes.join(" "));
  return `${authServerUrl}/oauth2/authorize?client_id=${clientId}&client_secret=${clientSecret}&response_type=code&scope=${scopeString}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}`;
}

export function buildLogoutUrl(): string {
  const { clientId, clientSecret, redirectUri, authServerUrl, scopes } =
    clientConfig;
  const scopeString = encodeURIComponent(scopes.join(" "));
  return `${authServerUrl}/logout?client_id=${clientId}&client_secret=${clientSecret}&response_type=code&scope=${scopeString}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}`;
}

export async function fetchOAuth2Data(code: string): Promise<string | null> {
  const { clientId, clientSecret, grantType, redirectUri, tokenEndpoint } =
    clientConfig;
  const credentials = btoa(`${clientId}:${clientSecret}`);
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${credentials}`
  };

  const params = new URLSearchParams({
    grant_type: grantType,
    code: code,
    redirect_uri: redirectUri
  }).toString();

  try {
    const resp = await axios.post(tokenEndpoint, params, {
      headers: headers
    });
    return resp.data;
  } catch (error) {
    console.error("Error fetching access token", error);
    return null;
  }
}
