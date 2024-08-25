import React, { createContext, useState, ReactNode } from "react";

// Create a context with a default value
const MyContext = createContext({
  name: "",
  email: "",
  setName: (name) => {},
  setEmail: (email) => {},
});

// Create a provider component
const MyProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <MyContext.Provider value={{ name, email, setName, setEmail }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
