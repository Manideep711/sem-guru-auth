import React, { useEffect, useState } from "react";
// const CLIENT_URL = process.env.REACT_APP_CLIENT_URL 
const CLIENT_URL =  "http://localhost:5000";

export default function AuthApp() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in
  useEffect(() => {
    fetch(`${CLIENT_URL}/auth/user`, {
      credentials: "include", // important to send cookies
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Not authenticated");
      })
      .then((data) => {
        setUser(data);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  // Logout function
const handleLogout = async () => {
  try {
    const response = await fetch("http://localhost:5000/auth/logout", {
      method: "GET",
      credentials: "include",  // IMPORTANT: send cookies
    });

    if (response.ok) {
      // After successful logout, redirect client-side
      window.location.href = "http://localhost:5173/";
    } else {
      console.error("Logout failed:", await response.text());
    }
  } catch (error) {
    console.error("Logout failed:", error);
  }
};


  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20, textAlign: "center" }}>
      {!user ? (
        <>
          <h2>Login with Google</h2>
          <a
            href={`${CLIENT_URL}/auth/google`}
            style={{
              display: "inline-block",
              padding: "10px 20px",
              backgroundColor: "#4285F4",
              color: "white",
              borderRadius: 5,
              textDecoration: "none",
            }}
          >
            Sign In with Google
          </a>
        </>
      ) : (
        <>
          <h2>Welcome, {user.name}!</h2>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout} style={{ padding: "10px 20px", cursor: "pointer" }}>
            Logout
          </button>
        </>
      )}
    </div>
  );
}
