const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const base64url = require("base64url");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());

const users = {}; // username -> user data

function generateChallenge() {
  return crypto.randomBytes(32);
}

/* ===== REGISTER OPTIONS ===== */
app.post("/register/options", (req, res) => {
  const { username } = req.body;
  const userId = crypto.randomUUID();
  const challenge = generateChallenge();

  users[username] = {
    id: userId,
    challenge,
    credential: null,
  };
  res.json({
    challenge: base64url.encode(challenge),
    rp: { name: "Passkey App" },
    user: {
      id: base64url.encode(Buffer.from(userId)),
      name: username,
      displayName: username,
    },
    pubKeyCredParams: [{ type: "public-key", alg: -7 }],
    authenticatorSelection: {
      authenticatorAttachment: "platform", // ✅ or cross-platform(USB)
      userVerification: "required",
    },
    timeout: 60000,
    attestation: "none",
  });
});

/* ===== REGISTER VERIFY ===== */
app.post("/register/verify", (req, res) => {
  const { username, credential } = req.body;
  const user = users[username];

  if (!user) return res.status(400).json({ error: "User not found" });

  // Save credential ID as raw binary
  user.credential = {
    id: base64url.toBuffer(credential.id),
  };

  res.json({ success: true });
});

/* ===== LOGIN OPTIONS ===== */
app.post("/login/options", (req, res) => {
  const { username } = req.body;
  const user = users[username];

  if (!user || !user.credential)
    return res.status(400).json({ error: "No passkey registered" });

  const challenge = generateChallenge();
  user.challenge = challenge;

  res.json({
    challenge: base64url.encode(challenge),
    allowCredentials: [
      {
        id: base64url.encode(user.credential.id),
        type: "public-key",
      },
    ],
    userVerification: "required",
  });
});

/* ===== LOGIN VERIFY ===== */
app.post("/login/verify", (req, res) => {
  const { username } = req.body;
  const user = users[username];

  if (!user) return res.status(400).json({ success: false });

  res.json({ success: true });
});

app.listen(5000, () =>
  console.log("✅ Backend running at http://localhost:5000")
);