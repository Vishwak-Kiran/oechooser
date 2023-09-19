const admin = require("firebase-admin");

const serviceAccount = require("./path/to/your/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Add other configuration options as needed
});

module.exports = admin;
