import axios from "axios";

/*
 *******************************************************************************
 * 授权码模式（PKCE）
 *******************************************************************************
 */
export const clientConfig = {
  clientId: "rico-client-pkce",
  clientSecret: "123", // 注意：在前端代码中暴露 clientSecret 是不安全的，通常这应该在服务器端处理。
  scopes: ["openid", "test.read"],
  grantType: "authorization_code",
  redirectUri: "https://client-server:8848/authorized-enhanced",
  authServerUrl: "http://auth-server:9000/oauth2",
  tokenEndpoint: "/oauth2-server/oauth2/token"
};

// Helper function to generate a random string for PKCE Code Verifier
function generateCodeVerifier(length = 128): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  let codeVerifier = "";
  for (let i = 0; i < length; i++) {
    codeVerifier += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return codeVerifier;
}

// Helper function to generate the corresponding Code Challenge for a given Code Verifier
async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  try {
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    const base64Digest = btoa(String.fromCharCode(...new Uint8Array(digest)));
    return base64Digest
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
  } catch (error) {
    console.error("Error generating code challenge:", error);
    throw error;
  }
}

export async function buildOAuth2Url(): Promise<string> {
  const { clientId, redirectUri, authServerUrl, scopes } = clientConfig;
  // PKCE Code Verifier and Challenge
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  console.log("codeVerifier => ", codeVerifier);
  console.log("codeChallenge => ", codeChallenge);
  // Store codeVerifier in local storage for later use
  localStorage.setItem("pkce_code_verifier", codeVerifier);

  const scopeString = encodeURIComponent(scopes.join(" "));
  return `${authServerUrl}/authorize?client_id=${clientId}&response_type=code&scope=${scopeString}&code_challenge=${codeChallenge}&code_challenge_method=S256&redirect_uri=${encodeURIComponent(
    redirectUri
  )}`;
}

export async function getAccessToken(code: string): Promise<string | null> {
  const { clientId, clientSecret, grantType, redirectUri, tokenEndpoint } =
    clientConfig;
  const codeVerifier = localStorage.getItem("pkce_code_verifier");
  const credentials = btoa(`${clientId}:${clientSecret}`);
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${credentials}`
  };

  const params = new URLSearchParams({
    grant_type: grantType,
    code: code,
    redirect_uri: redirectUri,
    code_verifier: codeVerifier
  }).toString();

  try {
    const resp = await axios.post(tokenEndpoint, params, {
      headers: headers
    });
    // After the token is obtained, clear the stored code verifier
    localStorage.removeItem("pkce_code_verifier");
    return resp.data.access_token;
  } catch (error) {
    console.error("Error fetching access token", error);
    return null;
  }
}
