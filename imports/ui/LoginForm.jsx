import React, { useState } from "react";
import { Meteor } from "meteor/meteor";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const submit = e => {
    e.preventDefault();
   Meteor.loginWithPassword(username, password)
  };

  return(
    <form onSubmit={submit} className="login-form">
      <div>
      <label htmlFor="username">User Name</label>
      <input 
        type="text"
        name="username"
        placeholder="Username"
        required
        onChange={e => setUsername(e.target.value)} 
      />
      </div>

      <div>
      <label htmlFor="password">Password</label>
      <input type="text" name="password" placeholder="password" required onChange={e=> setPassword(e.target.value)}/>
      </div>

      <div>
      <button type="submit">Submit</button>
      </div>
    </form>
  );
};