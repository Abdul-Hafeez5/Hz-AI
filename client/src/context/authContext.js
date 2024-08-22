import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // user logged in or not when page load

    const checkUserLoggedIn = async () => {
      try {
        const response = await fetch(``, {
          credentials: "include",
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data.user);
        } else {
          setUser(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  const login = async (email, password) => {
    const response = await fetch(``, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = response.json();

    if (response.ok) {
      setUser(data.user);
    } else {
      throw new Error(data.message);
    }
  };

  const signUp = async (username, email, password) => {
    const response = await fetch(``, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
      credentials: "include",
    });

    const data = await response.json();
    if (response.ok) {
      setUser(data.user);
    } else {
      throw new Error(data.message);
    }
  };

  const logout = async () => {
    await fetch(``, {
      credentials: "include",
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signUp, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
