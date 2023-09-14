import { error } from "console";

// Spotify API configuration
const clientID = "1b2e4d0711db4faab9a6b637df41d1b5";
const redirectURI = "http://localhost:3000/";
const authorizationEndpoint = "https://accounts.spotify.com/authorize";
const tokenEndpoint = "https://accounts.spotify.com/api/token";

// Function to generate a random string
function generateRandomString(length) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

// Function to initate the Spotify login flow. Generates a code verifier, code challenge and a random state like in the API documentation
function initateLogin() {
  const codeVerifier = generateRandomString(128);
  const codeChallenge = btoa(codeVerifier); // btoa is a js function for binary to ASCII
  const state = generateRandomString(16); // Optional in the documentation but it provides protection against attacks

  // Stores the code verifier in local storage
  localStorage.setItem("code_verifier", codeVerifier);

  // Following the documentation the required params
  const params = new URLSearchParams({
    client_id: clientID,
    response_type: "code",
    redirect_uri: redirectURI,
    state: state,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
  });

  // Responsible for creating the URL for the Spotify login and authorization page and the redirecting the user to that URL
  const loginURL = `${authorizationEndpoint}?${params.toString()}`;
  window.location.href = loginURL;
}

// Function to exchange the authorization code for an access token
function exchangeCodeForToken(code) {
  // Needed for the POST request
  const headers = {
    "Content-type": "application/x-www-form-urlencoded",
  };
  let codeVerifier = localStorage.getItem("code_verifier");

  // The body of the request for access token
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirectURI,
    client_id: clientID,
    code_verifier: codeVerifier,
  });

  return fetch(tokenEndpoint, {
    method: "POST",
    headers: headers,
    body: body.toString(),
  }).then((response) => response.json());
}
