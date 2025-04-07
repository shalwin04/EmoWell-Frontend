import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      const sessionStr = await AsyncStorage.getItem("session");
      if (sessionStr) {
        const parsed = JSON.parse(sessionStr);
        setSession(parsed);
      }
      setLoading(false);
    };

    loadSession();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    await AsyncStorage.removeItem("session");
    setSession(null);
  };

  const value = {
    session,
    setSession,
    signOut,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
