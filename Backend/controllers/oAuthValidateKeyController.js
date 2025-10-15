import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const client = jwksClient({
  jwksUri: "https://dev-gulb5urxcam7lnzm.us.auth0.com/.well-known/jwks.json", // ✅ Your Auth0 domain
});

// ✅ Function to get public key from Auth0 based on "kid"
const getKey = (header, callback) => {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      return callback(err, null);
    }
    const publicKey = key.getPublicKey();
    callback(null, publicKey);
  });
};

// ✅ Token validation function
const validateToken = async (token) =>
{    
  return new Promise((resolve, reject) => {
    jwt.verify(token, getKey, {}, (err, decoded) => {
      if (err) {
        return reject({ valid: false, message: "Invalid Token" });
      }
      resolve({ valid: true, decoded });
    });
  });
};

export default validateToken;
