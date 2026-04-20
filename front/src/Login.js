import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function bufferDecode(base64url) {
  const base64 = base64url
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(base64url.length + (4 - base64url.length % 4) % 4, "=");

  return Uint8Array.from(atob(base64), c => c.charCodeAt(0));
}

function bufferEncode(buffer) {
  const b64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function Login() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  /* ===== REGISTER ===== */
  const register = async () => {
    const res = await fetch("http://localhost:5000/register/options", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    const options = await res.json();

    options.challenge = bufferDecode(options.challenge);
    options.user.id = bufferDecode(options.user.id);

    const credential = await navigator.credentials.create({
      publicKey: options,
    });

    await fetch("http://localhost:5000/register/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        credential: {
          id: bufferEncode(credential.rawId),
          response: {
            attestationObject: bufferEncode(
              credential.response.attestationObject
            ),
          },
        },
      }),
    });

    alert("✅ Passkey Registered on Windows");
  };

  /* ===== LOGIN ===== */
  const login = async () => {
    const res = await fetch("http://localhost:5000/login/options", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    const options = await res.json();

    if (!options.allowCredentials || !options.allowCredentials.length) {
      alert("No passkey registered for this user");
      return;
    }

    options.challenge = bufferDecode(options.challenge);
    options.allowCredentials[0].id = bufferDecode(
      options.allowCredentials[0].id
    );

    await navigator.credentials.get({ publicKey: options });

    const verify = await fetch("http://localhost:5000/login/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    const result = await verify.json();
    if (result.success) {
      navigate("/dashboard"); // 🔥 Redirect after login
    } else {
      alert("Login failed");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Passkey Login</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <br /><br />
      <button onClick={register}>Register Passkey</button>
      <br /><br />
      <button onClick={login}>Login with Passkey</button>
    </div>
  );
}

export default Login;