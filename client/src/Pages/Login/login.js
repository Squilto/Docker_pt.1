// Login.js
import React from 'react';

function Login({ onLogin }) {
  const handleLogin = () => {
    const dummyUser = { username: 'testUser' }; // Replace with actual login logic
    onLogin(dummyUser);
  };

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}

export default Login;
