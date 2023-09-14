// Spotify API configuration
const clientID = "1b2e4d0711db4faab9a6b637df41d1b5";
const redirectURI = "http://localhost:3000/";

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
function initateLogin(){
    const codeVerifier = generateRandomString(128);
    const codeChallenge = btoa(codeVerifier); // btoa is a js function for binary to ASCII
    const state = generateRandomString(16); // Optional in the documentation but it provides protection against attacks
    const scope


    // Following the documentation the required params
    const params = new URLSearchParams({
        client_id: clientID,
        response_type: 'code',
        redirect_uri: redirectURI,
        state: state,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge
    });
}