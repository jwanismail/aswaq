import React, { createContext, useState, useEffect, ReactNode, useContext, useCallback } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt?: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  favorites: string[];
  fetchFavorites: () => Promise<void>;
  toggleFavorite: (listingId: string) => Promise<void>;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem('token');
    return storedToken || null;
  });
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error("Failed to parse stored user data:", e);
      return null;
    }
  });
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const fetchFavorites = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/users/favorites`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      if (!res.ok) {
        throw new Error('Favoriler yüklenemedi');
      }
      const data = await res.json();
      setFavorites(Array.isArray(data) ? data.map((fav: { _id: string }) => fav._id) : []);
    } catch (error) {
      console.error('Favoriler yüklenirken hata:', error);
      setFavorites([]);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchFavorites();
    } else {
      setFavorites([]);
    }
  }, [token, fetchFavorites]);

  const toggleFavorite = async (listingId: string) => {
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/api/users/favorites/${listingId}`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      if (!res.ok) {
        throw new Error('Favori işlemi başarısız');
      }
      await fetchFavorites();
    } catch (error) {
      console.error('Favori işlemi sırasında hata:', error);
    }
  };

  const login = (newToken: string, userData: User) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setFavorites([]);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ token, user, favorites, fetchFavorites, toggleFavorite, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 