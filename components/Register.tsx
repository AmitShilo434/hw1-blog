import React, { useState } from "react";

interface RegisterProps {
  onRegister: (username: string, password: string) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // Perform registration logic here
    onRegister(username, password);
  };

  return (
    <div>
      <h2>Register</h2>
      <form>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
