const admin = require("firebase-admin");

const firebaseCertConfig = {
  type: process.env.FB_CERT_TYPE,
  project_id: process.env.FB_CERT_PROJECT_ID,
  private_key_id: process.env.FB_CERT_PRIVATE_KEY_ID,
  private_key: process.env.FB_CERT_PRIVATE_KEY.replace(/\\n/gm, "\n"),
  client_email: process.env.FB_CERT_CLIENT_EMAIL,
  client_id: process.env.FB_CERT_CLIENT_ID,
  auth_uri: process.env.FB_CERT_AUTH_URI,
  token_uri: process.env.FB_CERT_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FB_CERT_AUTH_PROVIDER_X_509_CERT_URL,
  client_x509_cert_url: process.env.FB_CERT_CLIENT_X_509_CERT_URL,
};

admin.initializeApp({
  credential: admin.credential.cert(firebaseCertConfig),
});

const auth = admin.auth();

function deleteUser(uid) {
  return auth.deleteUser(uid);
}

function verifyIdToken(token) {
  return auth.verifyIdToken(token);
}

function getAuthToken(headers = {}) {
  return new Promise(function (resolve, reject) {
    if (!headers.authorization || !headers.authorization.startsWith("Bearer ")) {
      reject(new Error("Missing authorization header"));
    }

    const bearerToken = headers.authorization.substr(7);

    resolve(bearerToken);
  });
}

function login(req = {}, userClaims = {}) {
  const { email, uid, name } = userClaims;

  if (typeof email !== "string" || typeof uid !== "string") {
    throw new Error("Missing user claims");
  }

  req.user = {
    uid,
    email,
    name,
  };
}

module.exports = {
  deleteUser,
  verifyIdToken,
  getAuthToken,
  login,
};
